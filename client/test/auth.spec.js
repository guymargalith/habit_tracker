/**
* @jest-environment jsdom
*/


const { TestWatcher } = require('@jest/core');
const fs = require('fs');
const path = require('path');
const { requestLogin,requestRegistration, logout, login } = require('../static/js/auth.js');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


global.fetch = require('jest-fetch-mock');
let app = require('../static/js/auth.js');



describe('app', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../static/js/auth.js')
        // jest.useFakeTimers();
    })

    // afterEach(() => {
    //     fetch.resetMocks();
    // })

    describe('logout', () =>{
        describe('logout' ,() =>{
            beforeEach(() => {
                app.logout()
            })
            test('it exists', () =>{
                expect(fetch).toBeTruthy()
            }) 
            test('it logs out', () =>{
                app.logout()
                expect(fetch).toHaveBeenCalled();
            })
        })
    })
   

    //fetch request functions:

const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

describe('requestRegistration', () => {
  test('works', async () => {
    const json = await requestRegistration()
    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(0)
    expect(app.login).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalled()
  })

  
})
// describe('requestLogin', () => {
//   test('works', async () => {
//     const json = await requestLogin()
//     expect(Array.isArray(json)).toEqual(true)
//     expect(json.length).toEqual(0)
//   })
// })


describe('requestLogin', () => {
  beforeEach(() => {
    const test = {
      id: 1,
      username: 'user',
      password_digest: 'password'
    }
    app.requestLogin(test);
  })
  test('works', async () => {
    const json = await requestLogin()
    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(0)
  })
})

describe('requestRegistration', () => {
  beforeEach(() => {
    const test = {
      id: 1,
      username: 'user',
      password_digest: 'password'
    }
    app.requestRegistration(test);
  })
  test('works', async () => {
    const json = await requestRegistration()
    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(0)
  })
})

          
describe('login', () => {
  test('works', async () => {
    const json = await login()
    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(0)
    // expect(app.login).toHaveBeenCalled()
    // expect(fetch).toHaveBeenCalled()
  })

  
})
    

// describe('requestLogin', () =>{
//             beforeEach(() =>{
//                 const test = {
//                     id: 1,
//                     username: "user",
//                     password_digest: 'password'
//                 }
//                 app.requestLogin(test)
//             })
//             test('it posts', () =>{
//                 expect(app.requestLogin).toBeTruthy()
//             }) 

//         })

        
        // describe('Test', () => {
        //   test('POST /users', (done) => {
        //     request(app)
        //     .post('/users')
        //     .expect('Content-Type', /json/)
        //     .send({
        //       id: 1,
        //       username: 'user',
        //       password_digest: 'password'
        //     })
        //     .expect(201)
        //   })
        // })
        
})

