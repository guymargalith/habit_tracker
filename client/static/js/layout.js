// const loginSection = document.querySelector("#login-section");
// const registerSection = document.querySelector("#register-section");
// const loginButton = document.querySelector("#login-button");
// const registerButton = document.querySelector("#register-button");
const mainSection = document.querySelector("#main-section");


// renderHomepage();

// renderUserHabitsPage();

const publicRoutes = ['#', '#login', '#register'];
const privateRoutes = ['#userhabits'];

window.addEventListener('hashchange', updateMain)
window.addEventListener('load', updateMain)

function updateMain(){
    const path = window.location.hash
    mainSection.innerHTML ='';
    if(localStorage.getItem('token')){
        // window.location.hash = '#user-habits'
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
        }
    }
}


// function updateMain(){
//     const path = window.location.hash
//     if( path === '#'){
//         renderHomepage();
//     }
//     else if(path === '#login'){
//         renderLoginForm()
//     }
// }

// updateMain()

// function updateMain(path) {
//     mainSection.innerHTML = '';
//     if (path) {
//         switch(path){
//             case '#login':
//                 renderLoginForm(); break;
//             case '#register':
//                 renderRegisterForm(); break;
//             // case '#feed':
//             //     renderFeed(); break;
//             // case '#profile':
//             //     renderProfile(); break;
//             // default:
//             //     render404(); break;
//         }
//     } else {
//         renderHomepage();
//     }
// }

// function createButtonLink(route){
//     console.log(route)
//     const button = document.createElement('button')
//     button.classList = 'btn btn-lg btn-danger'
//     console.log(`${route[1]}${route.substring(2)}`)
//     button.textContent = route === '#' ? 'Home' : `${route[1].toUpperCase()}${route.substring(2)}`;
//     button.href = route;
//     return button;
// }

// function updateContent(){
//     const path = window.location.path
//     console.log(path)
//     updateMain(path);
// }

// function updateContent(){
//     const path = window.location.hash;
//     if (privateRoutes.includes(path) && !currentUser()){
//         window.location.hash = '#';
//     } else if (!privateRoutes.includes(path) && currentUser()) {
//         window.location.hash = '#feed';
//     } else {
//         updateMain(path);
//     }
// }

// updateContent();

