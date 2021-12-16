
async function getHabits(){
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    const result = await fetch("https://habit-tracker-sleighers.herokuapp.com/habits", options)
    const data = result.json();
    console.log(data)
}


async function getUsers(){
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token'),}),
    }
    const result = await fetch("https://habit-tracker-sleighers.herokuapp.com/users", options)
    const data = result.json();
    console.log(data)
}


async function getHabitsByUserId(id){
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    const result = await fetch(`https://habit-tracker-sleighers.herokuapp.com/habits/specific/${id}`, options)
    const data = await result.json();
    // const habits = data.map(d =>d.name)
    return data
}


async function getStreak(id){
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    const result = await fetch(`https://habit-tracker-sleighers.herokuapp.com/habits/${id}/streak`, options)
    const data = await result.json();
    return data.streak; 

}

async function getWeeklyLogs(id){
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    const result = await fetch(`https://habit-tracker-sleighers.herokuapp.com/habits/${id}/weekly`, options)
    const data = await result.json();
    console.log(data)
    return data.logs; 
}

async function createLog(habitId, date){
    const options = {
        method: 'POST',
        headers: new Headers({'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json'}),
        body: JSON.stringify({habitId: habitId, date: date})
    }
    const result = await fetch(`https://habit-tracker-sleighers.herokuapp.com/logs`, options)
    const data = await result.json()
    return data
}

async function deleteLog(logId){
    const options = {
        method: 'DELETE',
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    await fetch(`https://habit-tracker-sleighers.herokuapp.com/logs/${logId}`, options)
}


async function createNewHabit(habit, frequency){
    const options = {
        method: 'POST',
        headers: new Headers({'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json'}),
        body: JSON.stringify({name: habit, frequency: frequency, userId: localStorage.getItem('id')})
    }
    const result = await fetch(`https://habit-tracker-sleighers.herokuapp.com/habits`, options)
    const data = await result.json()
    return data
}

async function deleteHabit(habitId) {
    const options = {
        method: 'DELETE',
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    const result = await fetch(`https://habit-tracker-sleighers.herokuapp.com/habits/${habitId}`, options)
}

async function editHabit(id, habit, frequency) {
    const options = {
        method: 'PATCH',
        headers: new Headers({'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json'}),
        body: JSON.stringify({name: habit, frequency: frequency, id: id})
    }
    const result = await fetch(`https://habit-tracker-sleighers.herokuapp.com/habits`, options)
    const data = await result.json()
    console.log(data)
    return data
}


module.exports = { 
    getHabits,
    getHabitsByUserId,
    getUsers,
    getStreak,
    getWeeklyLogs,
    createLog,
    deleteLog,
    createNewHabit,
    deleteHabit,
    editHabit
}


