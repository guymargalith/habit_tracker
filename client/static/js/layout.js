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
