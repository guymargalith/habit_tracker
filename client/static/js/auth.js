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
    login(data.token);
  } catch (err) {
    console.warn(err);
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
    requestLogin(e);
  } catch (err) {
    console.warn(err);
  }
}

function login(token) {
  const user = jwt_decode(token);
  localStorage.setItem("token", token);
  localStorage.setItem("username", user.username);
  localStorage.setItem("id", user.id);
  window.location.hash = "#user-habits";
}

function logout(){
    localStorage.clear();
    window.location.hash = '#';
}

// function currentUser(){
//     const username = localStorage.getItem('username')
//     return username;
// }
