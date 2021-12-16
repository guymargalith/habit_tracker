/**
* @jest-environment jsdom
*/


const { TestWatcher } = require('@jest/core');
const fs = require('fs');
const path = require('path');

const { getHabits, getUsers, getHabitsByUserId, getStreak, getWeeklyLogs, createLog, deleteLog, createNewHabit, deleteHabit, editHabit } = require('../static/js/requests.js');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


global.fetch = require('jest-fetch-mock');

describe('app', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../static/js/requests.js')
        jest.useFakeTimers();
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('requests', () =>{
        describe('getHabits' ,() =>{
            beforeEach(() => {
                app.getHabits()
            })
            test('it exists', () =>{
                expect(app.getHabits).toBeTruthy()
            }) 
            test('creates a h1', () =>{
                app.getHabits()
                expect(fetch).toHaveBeenCalled();
            })
        })

        describe('getUsers', () =>{
            beforeEach(() =>{
                const mainSection = document.querySelector("#main-section");
            })
            test('it exists', () =>{
                expect(app.getUsers).toBeTruthy()
            }) 
            test('it works', () =>{
                app.getUsers()
                expect(fetch).toHaveBeenCalled();
            })

        })
        describe('getHabitByUserId', () =>{
          beforeEach(() =>{
              const mainSection = document.querySelector("#main-section");
          })
          test('it exists', () =>{
              expect(app.getHabitsByUserId).toBeTruthy()
          }) 
          test('it works', () =>{
              app.getHabitsByUserId()
              expect(fetch).toHaveBeenCalled();
          })

      })

      describe('getWeeklyLogs', () =>{
          beforeEach(() =>{
              const mainSection = document.querySelector("#main-section");
          })
          test('it exists', () =>{
              expect(app.getWeeklyLogs).toBeTruthy()
          }) 
          test('it works', () =>{
              app.getWeeklyLogs()
              expect(fetch).toHaveBeenCalled();
          })

      })
      describe('createLog', () =>{
          beforeEach(() =>{
              const mainSection = document.querySelector("#main-section");
          })
          test('it exists', () =>{
              expect(app.createLog).toBeTruthy()
          }) 
          test('it works', () =>{
              app.createLog()
              expect(fetch).toHaveBeenCalled();
          })

      })
      describe('editHabit', () =>{
          beforeEach(() =>{
              const mainSection = document.querySelector("#main-section");
          })
          test('it exists', () =>{
              expect(app.editHabit).toBeTruthy()
          }) 
          test('it works', () =>{
              app.editHabit()
              expect(fetch).toHaveBeenCalled();
          })

      })
      describe('deleteHabit', () =>{
          beforeEach(() =>{
              const mainSection = document.querySelector("#main-section");
          })
          test('it exists', () =>{
              expect(app.deleteHabit).toBeTruthy()
          }) 
          test('it works', () =>{
              app.deleteHabit()
              expect(fetch).toHaveBeenCalled();
          })

      })
    
})

})

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

describe('getStreak', () => {
  test('works', async () => {
    const json = await getStreak()
    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(0)
  })
})

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

describe('deleteLog', () => {
  test('works', async () => {
    const json = await deleteLog()
    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(0)
  })
})
