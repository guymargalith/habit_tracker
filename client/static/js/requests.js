async function getHabits(){
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    const result = await fetch("http://localhost:3000/habits", options)
    const data = result.json();
    console.log(data)
}


async function getUsers(){
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token'),}),
    }
    const result = await fetch("http://localhost:3000/users", options)
    const data = result.json();
    console.log(data)
}


async function getHabitsByUserId(id){
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    const result = await fetch(`http://localhost:3000/habits/specific/${id}`, options)
    const data = await result.json();
    // const habits = data.map(d =>d.name)
    return data
}

async function getStreak(id){
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    const result = await fetch(`http://localhost:3000/habits/${id}/streak`, options)
    const data = await result.json();
    return data.streak; 

}

async function getWeeklyLogs(id){
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    const result = await fetch(`http://localhost:3000/habits/${id}/weekly`, options)
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
    const result = await fetch(`http://localhost:3000/logs`, options)
    const data = await result.json()
    return data
}

async function deleteLog(logId){
    const options = {
        method: 'DELETE',
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    const result = await fetch(`http://localhost:3000/logs/${logId}`, options)
}


async function createNewHabit(habit, frequency){
    const options = {
        method: 'POST',
        headers: new Headers({'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json'}),
        body: JSON.stringify({name: habit, frequency: frequency, userId: localStorage.getItem('id')})
    }
    const result = await fetch(`http://localhost:3000/habits`, options)
    const data = await result.json()
    return data
}
// async function getAllPosts(){
//     try {
//         const options = {
//             headers: new Headers({'Authorization': localStorage.getItem('token')}),
//         }
//         const response = await fetch('http://localhost:3000/posts', options);
//         const data = await response.json();
//         if(data.err){
//             console.warn(data.err);
//             logout();
//         }
//         return data;
//     } catch (err) {
//         console.warn(err);
//     }
// }


// getHabits()
// getUsers()

