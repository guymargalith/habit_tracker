const db = require("../db_config/init");
const Log = require("./Log");

class Habit {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.frequency = data.frequency;
    this.userId = data.user_id;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(`SELECT * FROM habits;`);
        let habits = result.rows.map((r) => new Habit(r));
        res(habits);
      } catch (err) {
        rej(`Error retrieving habits: ${err}`);
      }
    });
  }

  static create({ name, frequency, userId }) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(
          "INSERT INTO habits (name, frequency, user_id) VALUES ($1, $2, $3) RETURNING *;",
          [name, frequency, userId]
        );
        let habit = new Habit(result.rows[0]);
        res(habit);
      } catch (err) {
        rej(`Error creating habit: ${err}`);
      }
    });
  }

  static findUserHabits(id) {
    return new Promise(async (res, rej) => {
      try {
        const result = await db.query(
          "SELECT * FROM habits WHERE user_id = $1;",
          [id]
        );
        let habits = result.rows.map((r) => new Habit(r));
        res(habits);
      } catch (err) {
        rej(`Error retrieving habits: ${err}`);
      }
    });
  }

  static findByID(id) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query("SELECT * FROM habits WHERE id = $1;", [
          id,
        ]);
        let habit = new Habit(result.rows[0]);
        res(habit);
      } catch (err) {
        rej(`Error retrieving habit: ${err}`);
      }
    });
  }

  get findAllLogs() {
    return new Promise(async (res, rej) => {
      try {
        const result = await db.query(
          "SELECT date FROM logs WHERE habit_id = $1 ORDER BY date DESC;",
          [this.id]
        );
        // const logs = result.rows.map(r => new Log(r))
        const logs = result.rows.map((r) => r.date);
        res(logs);
      } catch (err) {
        rej(`Error retrieving habits for this user: ${err}`);
      }
    });
  }

  static update({ name, frequency, id }) {
    return new Promise(async (res, rej) => {
      try {
        let updateHabit = await db.query(
          `UPDATE habits SET name = $1, frequency = $2 WHERE id = $3 RETURNING *`,
          [name, frequency, id]
        );

        let newHabit = new Habit(updateHabit.rows[0]);
        res(newHabit);
      } catch (err) {
        rej(`Error updating habits for this user: ${err}`);
      }
    });
  }

  get streak() {
    return new Promise(async (res, rej) => {
      try {
        const logs = await this.findAllLogs;
        // console.log(logs)
        const logLength = logs.length;
        // let startDate = new Date(new Date().toDateString()).getTime();
        // startDate = startDate/1000
        let startDate = 1639353600;
        // console.log(startDate)
        if (logLength < this.frequency) {
          res(0);
        } else {
          let currentWeekIndex = 0;
          while (
            currentWeekIndex < logLength &&
            logs[currentWeekIndex] > startDate - 6.048e5
          ) {
            currentWeekIndex++;
            // console.log(currentWeekIndex, 'a')
          }
          let findStartOfStreakIndex = -1;
          let weekCount = 2;
          let status = true;
          while (status) {
            let freqCount = 0;
            while (
              currentWeekIndex + findStartOfStreakIndex + 1 < logLength &&
              logs[currentWeekIndex + findStartOfStreakIndex + 1] >
                startDate - weekCount * 6.048e5
            ) {
              findStartOfStreakIndex++;
              freqCount++;
              // console.log(freqCount, 'b')
            }
            // console.log(weekCount, 'c')
            if (freqCount < this.frequency) {
              status = false;
            } else {
              weekCount++;
            }
          }
          let actualStreakStartIndex =
            currentWeekIndex + findStartOfStreakIndex;
          let status2 = true;
          // console.log(newCount, logs[newCount])
          while (status2) {
            let freqCount = 1;
            while (
              actualStreakStartIndex - freqCount > -1 &&
              logs[actualStreakStartIndex - freqCount] <
                logs[actualStreakStartIndex] + 6.048e5
            ) {
              freqCount++;
              // console.log(freqCount, 'd')
            }
            // console.log(actualStreakStartIndex, logs[actualStreakStartIndex])
            if (freqCount < this.frequency) {
              actualStreakStartIndex = actualStreakStartIndex - 1;
            } else {
              status2 = false;
            }
          }
          let streak = Math.floor(
            (startDate - logs[actualStreakStartIndex]) / 6.048e5
          );
          let frequencyCurrentWeek = 0;
          while (
            frequencyCurrentWeek < logLength &&
            logs[frequencyCurrentWeek] >=
              logs[actualStreakStartIndex] + streak * 6.048e5
          ) {
            frequencyCurrentWeek++;
            // console.log(frequencyCurrentWeek, 'e')
          }
          if (frequencyCurrentWeek >= this.frequency) {
            streak = streak + 1;
          }
          res(streak);
        }
      } catch (err) {
        rej(`Error calculating streak: ${err}`);
      }
    });
  }

  get weeklyLogs() {
    return new Promise(async (res, rej) => {
      try {
        let startDate = new Date(new Date().toDateString()).getTime();
        let startWeek = startDate / 1000 - 6.048e5;
        const result = await db.query(
          "SELECT * FROM logs WHERE habit_id = $1 AND date > $2 ORDER BY date DESC;",
          [this.id, startWeek]
        );
        const logs = result.rows.map((r) => new Log(r));
        res(logs);
      } catch (err) {
        rej(`Error getting logs: ${err}`);
      }
    });
  }
}

module.exports = Habit;
