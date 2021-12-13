async function getHabits(){
    const result = await fetch("http://localhost:3000/habits")
    const data = result.json();
    console.log(data)
}


async function getUsers(){
    const result = await fetch("http://localhost:3000/users")
    const data = result.json();
    console.log(data)
}


async function getHabitsByUserId(id){
    const result = await fetch(`http://localhost:3000/habits/specific/${id}`)
    const data = await result.json();
    const habits = data.map(d =>d.name)
    return habits
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

