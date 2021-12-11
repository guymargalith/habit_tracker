const db = require('../db_config/init');

class Habit {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.frequency = data.frequency
        this.userId = data.user_id
    }
    
    static get all(){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM habits;`);
                let habits = result.rows.map(r => new Habit(r))
                res(habits)
            } catch (err) {
                rej(`Error retrieving habits: ${err}`)
            }
        })
    }

    static create({ name, frequency, userId }){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query("INSERT INTO habits (name, frequency, user_id) VALUES ($1, $2, $3) RETURNING *;", [name, frequency, userId]);
                let habit = new Habit(result.rows[0]);
                res(habit)
            } catch (err) {
                rej(`Error creating habit: ${err}`)
            }
        })
    }

    
    // static findUserHabits(id){
    //     return new Promise(async (res, rej) => {
    //         try {
    //             const result = await db.query("SELECT * FROM habits WHERE user_id = $1;", [id]);
    //             let habits = result.rows.map(r => new Habit(r))
    //             res(habits)
    //         } catch (err) {
    //             rej(`Error retrieving habits: ${err}`)
    //         }
    //     })
    // }

    static findByID(id){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query("SELECT * FROM habits WHERE id = $1;", [id]);
                let habit = new Habit(result.rows[0])
                res(habit)
            } catch (err) {
                rej(`Error retrieving habit: ${err}`)
            }
        })
    }

    get findAllLogs(){
        return new Promise(async (res, rej) => {
            try {
                const result = await db.query("SELECT * FROM logs WHERE habit_id = $1 ORDER BY date DESC;", [this.id]);
                res(result)
            } catch (err) {
                rej(`Error retrieving habits for this user: ${err}`)
            }
        })
    }
}

module.exports = Habit