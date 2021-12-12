const { CustomConsole } = require('@jest/console');
const db = require('../db_config/init');
const Log = require('./Log')

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

    
    static findUserHabits(id){
        return new Promise(async (res, rej) => {
            try {
                const result = await db.query("SELECT * FROM habits WHERE user_id = $1;", [id]);
                let habits = result.rows.map(r => new Habit(r))
                res(habits)
            } catch (err) {
                rej(`Error retrieving habits: ${err}`)
            }
        })
    }

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
                const result = await db.query("SELECT date FROM logs WHERE habit_id = $1 ORDER BY date DESC;", [this.id]);
                // const logs = result.rows.map(r => new Log(r))
                const logs = result.rows.map(r => r.date)
                res(logs)
            } catch (err) {
                rej(`Error retrieving habits for this user: ${err}`)
            }
        })
    }

    get streak(){
        return new Promise(async (res, rej) => {
            try{
                const logs = await this.findAllLogs;
                // console.log(logs)
                const logLength = logs.length;
                let startDate = new Date(new Date().toDateString()).getTime();
                startDate = startDate/1000
                // console.log(startDate)
                if(logLength < this.frequency){
                    res(0)
                } else if(logs[0] <= startDate - (6.048e+5)){
                    res(0)
                } else {
                    let count = 0;
                    while(count < logLength && logs[count] > startDate - (6.048e+5)){
                        count++
                        // console.log(count, 'a')
                    }
                    count--
                    let count2 = -1;
                    let weekCount = 1;
                    let status = true;
                    const startingPoint = logs[count]
                    while(status){
                        let freqCount = 0;
                        while(count + count2 + 1 < logLength && logs[count + count2 + 1] > startingPoint - (weekCount * 6.048e+5)){
                            count2++
                            freqCount++
                            // console.log(freqCount, 'b')
                        }
                        // console.log(weekCount, 'c')
                        if (freqCount < this.frequency){
                            status = false;
                        } else {
                            weekCount++
                        }

                    }
                    let newCount = count + count2;
                    let status2 = true;
                    // console.log(newCount, logs[newCount])
                    while(status2){
                        let freqCount = 1;
                        while(newCount - freqCount > -1 && logs[newCount - freqCount] < logs[newCount] + (6.048e+5)){
                            freqCount++
                            // console.log(freqCount, 'd')
                        }
                        // console.log(newCount, logs[newCount])
                        if(freqCount < this.frequency){
                            newCount = newCount - 1;
                        } else {
                            status2 = false;
                        }
                    }
                    let streak = Math.floor((startDate-logs[newCount])/(6.048e+5));
                    let lastCount = 0;
                    while(lastCount < logLength && logs[lastCount] >= logs[newCount] + (streak * 6.048e+5)){
                        lastCount++
                        // console.log(lastCount, 'e')
                    }
                    if(lastCount >= this.frequency){
                        streak = streak + 1;
                    }
                    res(streak)
                }
            } catch(err){
                rej(`Error calculating streak: ${err}`)
            }
            
        })
        
    }
}

module.exports = Habit