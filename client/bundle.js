(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {renderHomepage, renderLoginForm, renderRegisterForm, renderUserHabitsPage, buildCards, checkLogin, checkPasswords } = require('./content.js')
async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        console.log(options)
        const r = await fetch(`http://localhost:3000/auth/login`, options)
        const data = await r.json()
        if (!data.success) { throw new Error('Login not authorised'); }
        login(data.token);
    } catch (err) {
        if(!document.querySelector(`[value="error"]`)){
            const errorMessage = document.createElement("div");
            errorMessage.setAttribute('value', 'error')
            errorMessage.textContent = "Your information does not match any on records";
            errorMessage.style.color = "white";
            mainSection.appendChild(errorMessage);
        }
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        console.log(options)
        const r = await fetch(`http://localhost:3000/auth/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        if(err.toString().includes('duplicate key value')){
            if(!document.querySelector(`[value="error"]`)){
                const errorMessage = document.createElement("div");
                errorMessage.setAttribute('value', 'error')
                errorMessage.textContent = 'This username is already registered';
                errorMessage.style.color = "white";
                mainSection.appendChild(errorMessage);
            }

        } else if(err.toString().includes('server')){
            if(!document.querySelector(`[value="error"]`)){
                const errorType = document.createElement('div');
                errorType.setAttribute('value', 'error')
                errorType.textContent = 'Experiencing an issue with the server';
                errorType.style.color = "white";
                mainSection.appendChild(errorType);
            }
        }
        
    }
}

function login(token){
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("id", user.id);
    window.location.hash = '#user-habits';
}

function logout(){
    localStorage.clear();
    window.location.hash = '#';
}


module.exports = { requestLogin, requestRegistration, logout};

},{"./content.js":2}],2:[function(require,module,exports){
const {getHabits, getHabitsByUserId,getUsers,getStreak,getWeeklyLogs,createLog,deleteLog, createNewHabit, deleteHabit, editHabit} = require('./requests')
const {requestLogin, requestRegistration, logout} = require('./auth')
const mainSection = document.querySelector("#main-section");
async function renderHomepage(){
    window.location.hash = '#';
    document.body.background = changeBackgroundImage()
    const welcomeTitle = document.createElement("h1");
    welcomeTitle.id = 'title';
    const welcomeSubTitle = document.createElement("h4");
    welcomeSubTitle.id = 'motivationalQuote';
    const buttonArea = document.createElement("div");
    const loginButton = document.createElement("button");
    loginButton.id = 'loginButtonHomepage';
    const registerButton = document.createElement("button");
    registerButton.id = 'registerButtonHomepage';
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
    const backButton = createBackButton();
    backButton.id = 'backButtonStyling';
    backButton.addEventListener('click',() => window.location.hash = '')
    const title = document.createElement('h1')
    const secondTitle = document.createElement('h4')
    title.className = "px-5 py-3 text-center";
    secondTitle.className = "px-5 py-3 text-center";
    title.textContent = 'Login'
    secondTitle.textContent = 'Every Journey Begins With a Single Step';
    const fields = [
                { tag: 'input', attributes: { type: 'username', name: 'username', placeholder: 'Username', required: 'required', class: 'login'} },
                { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password', required: 'required', class: 'login'} },
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
                        field.id = 'loginButtonLogin'
                        field.classList = 'btn btn-lg btn-danger col-md-2'
                    }
                    form.appendChild(field);
                })
            })
            form.classList ="px-5 py-3 text-center mx-auto row g-3"
            mainSection.appendChild(backButton)
            mainSection.appendChild(title)
            mainSection.appendChild(secondTitle)
            mainSection.appendChild(form);
            form.addEventListener("submit", requestLogin)
}

function renderRegisterForm(){
    document.body.background = changeBackgroundImage()
    const title = document.createElement('h1')
    title.id = 'registerTitle';
    const secondTitle = document.createElement('h4')
    const backButton = createBackButton();
    backButton.id = 'backButtonStyling';
    backButton.addEventListener('click',e => window.location.hash = '')
    title.className = "px-5 py-3 text-center";
    secondTitle.className = "px-5 py-3 text-center";
    title.textContent = 'Register'
    secondTitle.textContent = 'Did You Ever Hear About The Orange Headed Man';
    const fields = [
                { tag: 'input', attributes: { type: 'username', name: 'username', placeholder: 'Username', required: 'required', id: 'username'} },
                { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password', required: 'required' } },
                { tag: 'input', attributes: { type: 'password', name: 'confirmPassword', placeholder: 'Confirm Password', required: 'required' } },
                { tag: 'button', attributes: { type: 'submit', value: 'Login' } }
            ]
            const form = document.createElement('form');
           
            fields.forEach(f => {
                let field = document.createElement(f.tag);
                Object.entries(f.attributes).forEach(([a, v]) => {
                    field.setAttribute(a, v);
                    
                    if(field.name === 'username' || field.name === 'password' || field.name === 'confirmPassword'){
                        field.classList = 'form-control col input-spacing';
                    }
                    else{
                        field.textContent = "Register"
                        field.classList = 'btn btn-lg btn-danger button-width'
                    }
                    form.appendChild(field);
                })
            })
            form.classList ="px-5 py-3 text-center mx-auto row g-3"
            mainSection.appendChild(backButton)
            mainSection.appendChild(title)
            mainSection.appendChild(secondTitle)
            mainSection.appendChild(form);
            form.addEventListener("submit", checkPasswords)
}


async function renderUserHabitsPage(){
    document.body.background = changeBackgroundImage()
    const userHabitTitle = document.createElement('h1');
    userHabitTitle.id = 'habitTitle';
    const userSecondTitle = document.createElement('h4');
    userSecondTitle.id = 'secondTitle';

    const habitButton = createAddHabitButton();
    const habitForm = createAddHabbitForm();
    const logOutButton = createAddLogOutButton();
    logOutButton.id = 'logoutButton';
    userHabitTitle.classList ="h1-habits";
    habitForm.style.display = 'none';
    userHabitTitle.textContent = "TRACKIT"
    userSecondTitle.textContent = await getMotivationalQuote();
    mainSection.appendChild(logOutButton)
    mainSection.appendChild(userHabitTitle);
    mainSection.appendChild(userSecondTitle);
    mainSection.appendChild(habitButton);
    mainSection.appendChild(habitForm);
    habitButton.addEventListener('click', () => showHabitForm(habitForm))
    logOutButton.addEventListener('click', logout)
    const data = await getHabitsByUserId(localStorage.getItem('id'))
    // const data = await getHabitsByUserId(1)
    console.log(data)
    data.forEach(habit => buildCards(habit))

}


async function buildCards(habit){
    let card = document.createElement("div");
    card.id = 'card';
    let cardTitle = document.createElement('div')
    let checkboxArea = document.createElement('div')
    const streakTitle = await getStreakInfo(habit.id);
    const logsRaw = await getWeeklyLogs(habit.id)
    const logs = logsRaw.map(r => r.date)
    const editHabitForm = createEditHabbitForm();
    editHabitForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let form = e.target
        let editHabitAction = await editHabit( habit.id, form.habit.value, form.frequency.value)
        cardTitle.textContent = `${editHabitAction.name} - Target per week: ${editHabitAction.frequency}`
        await streakUpdater(habit.id);
        form.style.display = 'none';
        form.habit.value = "";
        form.frequency.value = "";
    })
    editHabitForm.style.display = 'none';
    card.classList = 'card';
    cardTitle.classList = 'card-header text-center';
    card.setAttribute("value", habit.id); 
    cardTitle.textContent = `${habit.name} - Target per week: ${habit.frequency}`;
    const buttonStack = createButtonStack(habit, card,editHabitForm, cardTitle)
    streakTitle.classList = 'streak';
    streakTitle.setAttribute('habit-id', habit.id)
    card.appendChild(cardTitle);
    console.log(logs)

    //checkbox creation zone
    for(let i =1; i <= 7; i++){
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'; 
    checkbox.setAttribute('value', timestamp(i));
    checkbox.setAttribute('habit-id', habit.id);
    if(logs.includes(parseInt(checkbox.getAttribute('value')))){
        let index = logs.findIndex(e => e===parseInt(checkbox.getAttribute('value')));
        checkbox.setAttribute("log-id", logsRaw[index].id)
        checkbox.checked = true;
    }
    checkbox.addEventListener('change', logManage)
    checkboxArea.appendChild(checkbox);
    let dateCheckbox = document.createElement('p');
    dateCheckbox.textContent = `${getDay(i)}`;
    if(i === 7){
        checkbox.classList = 'big';
        dateCheckbox.classList = 'big dateTopping';
    }
    else{
        dateCheckbox.classList = 'dateTopping';
    }
    checkboxArea.appendChild(dateCheckbox);
    }



    checkboxArea.classList = 'd-flex card-body';
    checkboxArea.appendChild(streakTitle)
    checkboxArea.appendChild(buttonStack)
    card.appendChild(checkboxArea);
    card.appendChild(editHabitForm);
    mainSection.appendChild(card);
    
}


function createAddHabitButton(){
    const habitButton = document.createElement('button');
    habitButton.id = 'habit-btn'
    habitButton.textContent = "Add Habit";
    habitButton.classList = 'btn btn-lg btn-danger button-width'
    return habitButton;
}

function createAddLogOutButton(){
    const logOutButton = document.createElement('button');
    logOutButton.textContent = "Log Out";
    logOutButton.classList = 'btn btn-lg btn-danger button-width d-flex justify-content-center left-margin'
    return logOutButton;
}

function createBackButton(){
    const backButton = document.createElement('button');
    backButton.textContent = "Back";
    backButton.classList = 'btn btn-lg btn-danger button-width d-flex justify-content-center left-margin'
    return backButton;
}

function createDeleteButton(){
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete Habit";
    deleteButton.classList = 'btn btn-md btn-danger button-width d-flex justify-content-center left-margin'
    return deleteButton;
}

function createEditHabitButton(){
    const editButton = document.createElement('button');
    editButton.textContent = "Edit Habit";
    editButton.classList = 'btn btn-md btn-danger button-width d-flex justify-content-center left-margin'
    return editButton;
}

function createButtonStack(habit, card, habitForm, title){
    const buttonStack = document.createElement('div');
    buttonStack.classList = 'button-stack';
    const editButton = createEditHabitButton()
    const deleteButton = createDeleteButton()
    buttonStack.appendChild(editButton);
    buttonStack.appendChild(deleteButton);
    editButton.addEventListener('click', ()=> showEditHabitForm(habitForm, title))
    deleteButton.addEventListener('click', ()=>
    {  if(confirm("Are you sure you would like to delete this habit?")){
        deleteHabit(habit.id)
        card.remove();
    }})
    return buttonStack;
}

function createAddHabbitForm(){
    const fields = [
        { tag: 'input', attributes: { type: 'text', name: 'habit', placeholder: 'Habit Name', required: 'required', id: 'habitNameInput' } },
        { tag: 'input', attributes: { type: 'text', name: 'frequency', placeholder: 'How Often Do You Want To Do This Per Week?', required: 'required', id: 'timesPerWeekInput' } },
        { tag: 'button', attributes: { type: 'submit', value: 'Submit', id: 'submitBtnHabits' } }
    ]
    const form = document.createElement('form');
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => {
            field.setAttribute(a, v);
            if(field.name === 'habit' || field.name === 'frequency'){
                field.classList = 'form-control col input-spacing';
            }
            else{
                field.textContent = "Submit"
                field.classList = 'btn btn-lg btn-danger button-width'
            }
            form.appendChild(field);
        })
    })
    form.classList ="py-5 text-center mx-auto row g-3"
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let form = e.target
        const newHabit = await createNewHabit(form.habit.value, form.frequency.value)
        let habitButton = document.querySelector('#habit-btn')
        habitButton.textContent = "Add Habit"
        buildCards(newHabit)
        form.style.display = 'none';
        form.habit.value = "";
        form.frequency.value = "";
    })
    return form
}

function createEditHabbitForm(){
    const fields = [
        { tag: 'input', attributes: { type: 'text', name: 'habit', placeholder: 'Habit name', required: 'required' } },
        { tag: 'input', attributes: { type: 'text', name: 'frequency', placeholder: 'Frequency', required: 'required' } },
        { tag: 'button', attributes: { type: 'submit', value: 'Submit', id: 'submitEdit' } }
    ]
    const form = document.createElement('form');
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => {
            field.setAttribute(a, v);
            if(field.name === 'habit' || field.name === 'frequency'){
                field.classList = 'form-control col input-spacing';
            }
            else{
                field.textContent = "Submit"
                field.classList = 'btn btn-md btn-danger button-width'
            }
            form.appendChild(field);
        })
    })
    form.classList ="text-center mx-auto row g-3"
    return form
}

// async function checkLogin(e) {
//     e.preventDefault();
//     try{
//         await requestLogin(e);
//     } catch(err){
//         console.log("Here")
//         const errorMessage = document.createElement("div");
//         errorMessage.textContent = "Your information does not match any on records";
//         errorMessage.style.color = "white";
//         mainSection.appendChild(errorMessage);
//     } 
    
//   }

async function checkPasswords(e) {
    e.preventDefault();
    let password = e.target.password.value;
    let confirmedPassword = e.target.confirmPassword.value;
    if (password != confirmedPassword) {
      const errorMessage = document.createElement("div");
      errorMessage.textContent = "Please make sure your passwords match";
      errorMessage.style.color = "white";
      mainSection.appendChild(errorMessage);
    } else {
      await requestRegistration(e);
    }
  }

function showHabitForm(form){
    console.log("clicked")
    let habitButton = document.querySelector('#habit-btn')
    if(form.style.display == "none"){
        form.style.display = "block"
        habitButton.textContent = "X"
    }
    else{
        form.style.display = "none"
        habitButton.textContent = "Add Habit"
        form.style.display = 'none';
        form.habit.value = "";
        form.frequency.value = "";
    }
    
}

function showEditHabitForm(form, title){
    console.log("clicked")
    form.id = 'editFormHabit';
    if(form.style.display == "none"){
        form.style.display = "block"
        let splitTitle = title.textContent.split(/-|:/)
        console.log(splitTitle)
        form.habit.value = splitTitle[0]
        form.frequency.value = parseInt(splitTitle[2])
    }
    else{
        form.style.display = "none"
    }
    
}

async function getStreakInfo(id)
{
    let streakTitle = document.createElement('h1')
    streakTitle.classList = 'card-title py-1';
    const data = await getStreak(id);
    console.log(data);
    streakTitle.textContent = `Your current streak is: ${data}`;
    return streakTitle;

}

async function streakUpdater(id) {
    let data = await getStreak(id);
    console.log(data)
    document.querySelector(`.streak[habit-id="${id}"]`).textContent = `Your current streak is: ${data}`
}
// getStreakInfo(1);

function getDay(i){
    let day = new Date(); 
    day.setDate(day.getDate() + i)
    return day.toLocaleString('en-us', {  weekday: 'short' });
}

function timestamp(i){
    let dateEdit = new Date()
    dateEdit.setDate(dateEdit.getDate() - 7 + i)
    let date = new Date(dateEdit.toDateString()).getTime();
    return date/1000
}



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

async function logManage(e){
    const checkbox = e.target;
    if(checkbox.checked){
        let log = await createLog(checkbox.getAttribute('habit-id'), checkbox.value)
        checkbox.setAttribute('log-id', log.id)
    } else {
        await deleteLog(checkbox.getAttribute('log-id'))
        checkbox.removeAttribute('log-id')
    }
    await streakUpdater(checkbox.getAttribute('habit-id'))
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

function render404() {
    document.body.background = changeBackgroundImage()
    const error = document.createElement('h2');
    error.textContent = "Oops, we can't find that page sorry!";
    main.appendChild(error);
}

module.exports = {renderHomepage, renderLoginForm, renderRegisterForm, renderUserHabitsPage, render404}
},{"./auth":1,"./requests":4}],3:[function(require,module,exports){
const {renderHomepage, renderLoginForm, renderRegisterForm, renderUserHabitsPage, render404} = require('./content')

const mainSection = document.querySelector("#main-section");


window.addEventListener('hashchange', updateMain)
window.addEventListener('load', updateMain)

function updateMain(){
    const path = window.location.hash
    mainSection.innerHTML ='';
    if(localStorage.getItem('token')){
        renderUserHabitsPage();
    } else {
        switch (path){
        case '':
            renderHomepage(); break;
        case '#':
            renderHomepage(); break;
        case '#login':
            renderLoginForm(); break;
        case '#register':
            renderRegisterForm(); break;
        case '#user-habits':
            window.location.hash = ''; break;
        default: 
            render404(); break;
    }
}
}

},{"./content":2}],4:[function(require,module,exports){

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
    await fetch(`http://localhost:3000/logs/${logId}`, options)
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

async function deleteHabit(habitId) {
    const options = {
        method: 'DELETE',
        headers: new Headers({'Authorization': localStorage.getItem('token')}),
    }
    const result = await fetch(`http://localhost:3000/habits/${habitId}`, options)
}

async function editHabit(id, habit, frequency) {
    const options = {
        method: 'PATCH',
        headers: new Headers({'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json'}),
        body: JSON.stringify({name: habit, frequency: frequency, id: id})
    }
    const result = await fetch(`http://localhost:3000/habits`, options)
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



},{}]},{},[3]);
