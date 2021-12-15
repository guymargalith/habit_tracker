/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const { renderHomepage, renderLoginForm, renderRegisterForm, renderUserHabitsPage, getMotivationalQuote, buildCards } = require('../static/js/content')
const layout = require('../static/js/layout')
let auth = require('../static/js/auth')
const pg = require('pg');
jest.mock('pg');
global.fetch = require('jest-fetch-mock');
let app = require('../static/js/content');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');






describe('render homepage', ()=>{
    beforeEach(  () => {
        document.documentElement.innerHTML = html.toString();
        
         app.renderHomepage()
         getMotivationalQuote()
    })
    afterEach(() => {
        fetch.resetMocks();
    })
    
    it('has a function to render the homepage',()=>{
        expect(renderHomepage).toBeTruthy()
    });
    
    it('has a function to get motivaitional quotes', ()=>{
        expect(getMotivationalQuote).toBeTruthy()
    })
    
//         it('appends a title', ()=>{
//             app.renderHomepage()
//             const title = document.querySelector('h1')
//             expect(title).toBeNull()
//         })
//     })


describe('render login form', ()=>{
    beforeEach(  () => {
        document.documentElement.innerHTML = html.toString();
        // app = require('../static/js/content')
        app.renderLoginForm()
    })
    afterEach(() => {
        fetch.resetMocks();
    })
    it('has a function to render a log in page',()=>{
        jest.spyOn(app, 'form.addEventListener("submit", requestLogin)')
        expect(renderLoginForm).toBeTruthy()
    });
})

describe('render register form', ()=>{
    beforeEach(  () => {
        document.documentElement.innerHTML = html.toString();
        // app = require('../static/js/content')
        app.renderRegisterForm()
    })
    afterEach(() => {
        fetch.resetMocks();
    })
    it('has a function to render the registration page',()=>{
        expect(renderRegisterForm).toBeTruthy()
    });
})

describe('render habits page', ()=>{
    beforeEach(() => {
        app.renderUserHabitsPage()
        document.documentElement.innerHTML = html.toString();
    })
    afterEach(() => {
        fetch.resetMocks();
    })
    it('has a function to render the habits page',()=>{
        expect(renderUserHabitsPage).toBeTruthy()
    });
})

describe('build cards', ()=>{
    beforeEach(() => {
        buildCards()
        // document.documentElement.innerHTML = html.toString();
    })
    it('builds a card', ()=>{
        expect(buildCards).toBeTruthy()
    })
})
})