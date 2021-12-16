const db = require('../db_config/init');
const Habit = require('./Habit')

class User {
    constructor(data){
        this.id = data.id
        this.username = data.username
        this.passwordDigest = data.password_digest
    }
    
    static get all(){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM users;`);
                let users = result.rows.map(r => new User(r))
                res(users)
            } catch (err) {
                rej(`Error retrieving users: ${err}`)
            }
        })
    }

    static create({ username, password }){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query("INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *;", [username, password]);
                let user = new User(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    }

    static findByUsername(username){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query("SELECT * FROM users WHERE username = $1;", [username]);
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }

    // static findByID(id){
    //     return new Promise(async (res, rej) => {
    //         try {
    //             let result = await db.query("SELECT * FROM users WHERE id = $1;", [id]);
    //             let user = new User(result.rows[0])
    //             res(user)
    //         } catch (err) {
    //             rej(`Error retrieving user: ${err}`)
    //         }
    //     })
    // }

    // get allHabits() {
    //     return new Promise(async (res, rej) => {
    //         try {
    //             const result = await db.query("SELECT * FROM habits WHERE user_id = $1;", [this.id]);
    //             let habits = result.rows.map(r => new Habit(r))
    //             res(habits)
    //         } catch (err) {
    //             rej(`Error retrieving habits for this user: ${err}`)
    //         }
    //     })
    // }
}

module.exports = User