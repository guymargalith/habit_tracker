async function renderHomepage(){
    window.location.hash = '#';
    document.body.background = changeBackgroundImage()
    const welcomeTitle = document.createElement("h1");
    const welcomeSubTitle = document.createElement("h4");
    const buttonArea = document.createElement("div");
    const loginButton = document.createElement("button");
    const registerButton = document.createElement("button");
    const loginAnchorTag = document.createElement("a");
    const registerAnchorTag = document.createElement("a");
    welcomeTitle.textContent = "TRACKIT";
    welcomeTitle.className = "px-5 py-3 text-center";
    welcomeSubTitle.textContent = await getMotivationalQuote()
    welcomeSubTitle.className = "px-5 py-1 text-center";
    loginButton.textContent = "Login";
    registerButton.textContent = "Register";
    loginButton.className = "btn btn-lg btn-danger";
    loginButton.type = "submit";
    registerButton.className = "btn btn-lg btn-danger";
    buttonArea.className = "d-flex gap-4 col-2 mx-auto";
    loginAnchorTag.href = "#login"
    registerAnchorTag.href='#register'
    mainSection.appendChild(welcomeTitle);
    mainSection.appendChild(welcomeSubTitle);
    loginAnchorTag.appendChild(loginButton);
    registerAnchorTag.appendChild(registerButton);
    buttonArea.appendChild(loginAnchorTag);
    buttonArea.appendChild(registerAnchorTag);
    mainSection.appendChild(buttonArea)
}

function renderLoginForm(){
    document.body.background = changeBackgroundImage()
    const title = document.createElement('h1')
    const secondTitle = document.createElement('h4')
    title.className = "px-5 py-3 text-center";
    secondTitle.className = "px-5 py-3 text-center";
    title.textContent = 'Login'
    secondTitle.textContent = 'Every Journey Begins With a Single Step';
    const fields = [
                { tag: 'input', attributes: { type: 'username', name: 'username', placeholder: 'Username' } },
                { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
                { tag: 'button', attributes: { type: 'submit', value: 'Login' } }
            ]
            const form = document.createElement('form');
            fields.forEach(f => {
                let field = document.createElement(f.tag);
                Object.entries(f.attributes).forEach(([a, v]) => {
                    field.setAttribute(a, v);
                    if(field.name === 'username' || field.name === 'password'){
                        field.classList = 'form-control col input-spacing';
                    }
                    else{
                        field.textContent = "Login"
                        field.classList = 'btn btn-lg btn-danger col-md-2'
                    }
                    form.appendChild(field);
                })
            })
            form.classList ="px-5 py-3 text-center mx-auto row g-3"
            mainSection.appendChild(title)
            mainSection.appendChild(secondTitle)
            mainSection.appendChild(form);
            // form.addEventListener("submit", someFunction())
}

function renderRegisterForm(){
    document.body.background = changeBackgroundImage()
    const title = document.createElement('h1')
    const secondTitle = document.createElement('h4')
    title.className = "px-5 py-3 text-center";
    secondTitle.className = "px-5 py-3 text-center";
    title.textContent = 'Register'
    secondTitle.textContent = 'Did You Ever Hear About The Orange Headed Man';
    const fields = [
                { tag: 'input', attributes: { type: 'username', name: 'username', placeholder: 'Username' } },
                { tag: 'input', attributes: { type: 'username', name: 'username', placeholder: 'Email' } },
                { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
                { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Confirm Password' } },
                { tag: 'button', attributes: { type: 'submit', value: 'Login' } }
            ]
            const form = document.createElement('form');
            fields.forEach(f => {
                let field = document.createElement(f.tag);
                Object.entries(f.attributes).forEach(([a, v]) => {
                    field.setAttribute(a, v);
                    if(field.name === 'username' || field.name === 'password'){
                        field.classList = 'form-control col input-spacing';
                    }
                    else{
                        field.textContent = "Regsiter"
                        field.classList = 'btn btn-lg btn-danger button-width'
                    }
                    form.appendChild(field);
                })
            })
            form.classList ="px-5 py-3 text-center mx-auto row g-3"
            mainSection.appendChild(title)
            mainSection.appendChild(secondTitle)
            mainSection.appendChild(form);
            // form.addEventListener("submit", someFunction())
}


async function renderUserHabitsPage(){
    const id = 1;
    document.body.background = changeBackgroundImage()
    const userHabitTitle = document.createElement('h1');
    const userSecondTitle = document.createElement('h4');
    userHabitTitle.textContent = "Welcome to Jumanji"
    userSecondTitle.textContent = await getMotivationalQuote();
    mainSection.appendChild(userHabitTitle);
    mainSection.appendChild(userSecondTitle);
    const data = await getHabitsByUserId(id)
    console.log(data)
    data.forEach(habit => buildCards(habit))

}


async function buildCards(habit){
    let card = document.createElement("div");
    card.classList = 'card';
    card.setAttribute("value", habit.id); 
    let cardTitle = document.createElement('div')
    cardTitle.classList = 'card-header text-center';
    cardTitle.textContent = habit.name;
    let checkboxArea = document.createElement('div')
    let dateSpace = document.createElement('div');
    const streakTitle = await getStreakInfo(habit.user_id);
    streakTitle.classList = 'streak';
    card.appendChild(cardTitle);
    const logs = await getWeeklyLogs(habit.id)
    console.log(logs)
    for(let i =1; i <= 7; i++){
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'; 
    checkbox.setAttribute('value', timestamp(i));
    // 
    // if(logs.forEach(r => r.date).includes(checkbox.getAttribute('value'))){
    //     // checkbox
    // }
    checkboxArea.appendChild(checkbox);
    
    if(i === 7){
        checkbox.classList = 'big';
    }
    let dateCheckbox = document.createElement('p');
    dateCheckbox.classList = 'dateTopping';
    dateCheckbox.textContent = `${getDay(i)}`;
    
    checkboxArea.appendChild(dateCheckbox);
    }
    checkboxArea.classList = 'd-flex card-body';
    checkboxArea.append(streakTitle)
    card.appendChild(checkboxArea);
    mainSection.appendChild(card)


    
}

async function getStreakInfo(id)
{
    let streakTitle = document.createElement('div')
    streakTitle.classList = 'card-title py-1';
    const data = await getStreak(id);
    console.log(data);
    streakTitle.textContent = `Your current streak is: ${data}`;
    return streakTitle;

}
getStreakInfo(1);

function getDay(i){
    let day = new Date(); 
    day.setDate(day.getDate() + i)
    return day.toLocaleString('en-us', {  weekday: 'short' });
}

function timestamp(i){
    let dateEdit = new Date()
    dateEdit.setDate(dateEdit.getDate() - (7+i))
    let date = new Date(dateEdit.toDateString()).getTime();
    return date/1000
}

getDay()
{/* <div class="card ">
<div class="card-header text-center ">
  Don't eat an egg
</div>
<div class="d-flex card-body">
    <input type="checkbox" name="" class="checkbox" id="">
  <input type="checkbox" name="" class="checkbox" id="">
  <input type="checkbox" name="" class="checkbox" id="">
  <input type="checkbox" name="" class="checkbox" id="">
  <input type="checkbox" name="" class="checkbox" id="">
  <input type="checkbox" name="" class="checkbox" id="">
  <input type="checkbox" name="" class="checkbox" id="big">
  <h5 class="card-title py-1">You have a streak of 5. Keep Going!!!</h5>
  
  
</div>
</div> */}

async function getMotivationalQuote(){
    const resp = await fetch("https://type.fit/api/quotes")
    const data = await resp.json();
    return data[randomNumber()].text
}

function randomNumber(){
   const number = Math.floor((Math.random() * 1642) + 1);
   return number
}

function changeBackgroundImage(){
let num = Math.ceil( Math.random() * images.length -1);
const image = images[num];
console.log(images[num])
return image

}


const images =[
    "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", 
    "https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1521833965051-8273d0579115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
    "https://images.unsplash.com/photo-1497561813398-8fcc7a37b567?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1484100356142-db6ab6244067?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1067&q=80",
    "https://images.unsplash.com/photo-1525954294489-85bb0c9d2369?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1523995669073-7f16bd0e82f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1560165427-318ff4b78a0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
    "https://images.unsplash.com/photo-1556529260-2c56d89db68c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"

]

// function renderLoginForm() {
//     const fields = [
//         { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email' } },
//         { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
//         { tag: 'input', attributes: { type: 'submit', value: 'Login' } }
//     ]
//     const form = document.createElement('form');
//     fields.forEach(f => {
//         let field = document.createElement(f.tag);
//         Object.entries(f.attributes).forEach(([a, v]) => {
//             field.setAttribute(a, v);
//             form.appendChild(field);
//         })
//     })
//     form.addEventListener('submit', requestLogin)
//     main.appendChild(form);
// }

// function renderRegisterForm() {
//     const fields = [
//         { tag: 'input', attributes: { type: 'text', name: 'username', placeholder: 'Username' } },
//         { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email' } },
//         { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
//         { tag: 'input', attributes: { type: 'password', name: 'passwordConfirmation', placeholder: 'Confirm Password' } },
//         { tag: 'input', attributes: { type: 'submit', value: 'Create Account' } }
//     ]
//     const form = document.createElement('form');
//     fields.forEach(f => {
//         let field = document.createElement(f.tag);
//         Object.entries(f.attributes).forEach(([a, v]) => {
//             field.setAttribute(a, v);
//             form.appendChild(field);
//         })
//     })
//     form.addEventListener('submit', requestRegistration)
//     main.appendChild(form);
// }

// async function renderFeed() {
//     const feed = document.createElement('section');
//     feed.id = 'feed';
//     const posts = await getAllPosts();
//     if(posts.err){return}
//     const renderPost = postData => {
//         const post = document.createElement('div');
//         post.className = 'post';
//         const user = document.createElement('h3');
//         const body = document.createElement('p');
//         user.textContent = postData.username;
//         body.textContent = postData.body;
//         post.appendChild(user);
//         post.appendChild(body);
//         feed.appendChild(post);
//     }
//     posts.forEach(renderPost);
//     main.appendChild(feed);
// }

// function renderProfile() {
//     const profile = document.createElement('section');
//     const greeting = document.createElement('h3');
//     greeting.textContent = `Hi there, ${localStorage.getItem('username')}!`;
//     profile.appendChild(greeting);
//     main.appendChild(profile);
// }

// function render404() {
//     const error = document.createElement('h2');
//     error.textContent = "Oops, we can't find that page sorry!";
//     main.appendChild(error);
// }