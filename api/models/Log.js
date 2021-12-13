const db = require('../db_config/init');

class Log {
    constructor(data){
        this.id = data.id
        this.date = data.date
        this.habitId = data.habit_id
    }
    
    static get all(){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM logs;`);
                let logs = result.rows.map(r => new Log(r))
                res(logs)
            } catch (err) {
                rej(`Error retrieving logs: ${err}`)
            }
        })
    }

    static create({ date, habitId }){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query("INSERT INTO logs (date, habit_id) VALUES ($1, $2) RETURNING *;", [date, habitId]);
                let log = new Log(result.rows[0]);
                res(log)
            } catch (err) {
                rej(`Error creating log: ${err}`)
            }
        })
    }

    static findByID(id){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query("SELECT * FROM logs WHERE id = $1;", [id]);
                let log = new Log(result.rows[0])
                res(log)
            } catch (err) {
                rej(`Error retrieving habit: ${err}`)
            }
        })
    }

    destroy(){
        return new Promise(async (res, rej) => {
            try {
                await db.query("DELETE FROM logs WHERE id = $1;", [this.id]);
                res('Log was deleted')
            } catch (err) {
                rej(`Error deleting log: ${err}`)
            }
        })
    }
}

module.exports = Log