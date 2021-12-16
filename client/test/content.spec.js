/**
* @jest-environment jsdom
*/


const { TestWatcher } = require('@jest/core');
const fs = require('fs');
const path = require('path');
const { randomNumber, createEditHabitButton, createEditHabbitForm, renderHomepage, renderLoginForm, renderRegisterForm, renderUserHabitsPage, buildCards, createAddHabitButton, createAddLogOutButton, createBackButton, createDeleteButton, createButtonStack, createAddHabbitForm, checkPasswords, showHabitForm, showEditHabitForm, getStreakInfo, streakUpdater, getDay, timestamp, getMotivationalQuote, changeBackgroundImage, logManage, render404 } = require('../static/js/content.js');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const {getHabitsByUserId} = require('../static/js/requests.js')


global.fetch = require('jest-fetch-mock');
let app;

let spy;
beforeAll(() => {
  spy = jest.spyOn(document, 'getElementById');
});


describe('app', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../static/js/content.js')
        const mainSection = document.getElementById("#main-section");

    })

    afterEach(() => {
        fetch.resetMocks();
    })

    // describe('requests', () =>{
        describe('renderHomepage' ,() =>{
            beforeEach(() => {
                const mainSection = document.querySelector("#main-section");
                app.renderHomepage()
                
            })
            test('it exists', () =>{
                expect(app.renderHomepage).toBeTruthy()
            }) 
            test('renderHomepage is called', () =>{
                expect(fetch).toHaveBeenCalled();
            })
            test('mainSection appends ButtonArea', () =>{
                expect(fetch).toHaveBeenCalled();
            })


        })
     
    // });

            // test('creates a h1', () =>{
            //     // app.renderHomepage();
            //     expect(fetch).toHaveBeenCalled();
            // })

        //THIS ONE WORKS:
    
        describe('renderLoginForm', () =>{
            beforeEach(() =>{
                const mainSection = document.querySelector("#main-section");
                app.renderLoginForm()
            })
            test('it exists', () =>{
                expect(app.renderLoginForm).toBeTruthy()
            }) 
            test('function is called', () =>{
                expect(fetch).toHaveBeenCalled();
            })

        })

        // })
        describe('renderRegisterForm', () =>{
            beforeEach(() =>{
                app.renderRegisterForm()                
            })
            test('it exists', () =>{
                expect(app.renderRegisterForm).toBeTruthy()
            }) 
            test('it adds a h1', () => {
                
                expect(fetch).toHaveBeenCalled();
            })

        })
        describe('renderUserHabitsPage', () =>{
            beforeEach(() =>{
                const mainSection = document.querySelector("#main-section");
                renderUserHabitsPage()
            })
            test('it exists', () =>{
                expect(app.renderUserHabitsPage).toBeTruthy()
            }) 
            test('creates a h1', () =>{
                
                expect(fetch).toHaveBeenCalled();
            })
        })

        
        describe('buildCards', () =>{
            beforeEach(() =>{
                const habit = {
                    id: 1,
                    name: "habit1",
                    frequency: 2,
                    user_id: 1
                }
                
                app.buildCards(habit)
            })
            test('it exists', () =>{
                expect(app.buildCards).toBeTruthy()
            }) 

        })
        describe('createAddHabitButton', () =>{
            beforeEach(() =>{
                app.createAddHabitButton()
            })
            test('it exists', () =>{
                expect(app.createAddHabitButton).toBeTruthy()
            }) 
            test('it adds a button', () => {
                
                expect(fetch).toContain('button');
            })

        })
        describe('createAddLogOutButton', () =>{
            beforeEach(() =>{
                app.createAddLogOutButton()
            })
            test('it exists', () =>{
                expect(app.createAddLogOutButton).toBeTruthy()
            }) 
            test('it adds a h1', () => {
                expect(fetch).toHaveBeenCalled();
            })

        })
        describe('createBackButton', () =>{
            beforeEach(() =>{
                app.createBackButton()
            })
            test('it exists', () =>{
                expect(app.createBackButton).toBeTruthy()
            }) 

        })
        describe('createDeleteButton', () =>{
            beforeEach(() =>{
                app.createDeleteButton()
            })
            test('it exists', () =>{
                expect(app.createDeleteButton).toBeTruthy()
            }) 
            test('it adds a h1', () => {
                expect(fetch).toHaveBeenCalled();
            })

        })
        describe('createEditHabitButton', () =>{
            beforeEach(() =>{
                app.createEditHabitButton()
            })
            test('it exists', () =>{
                expect(app.createEditHabitButton).toBeTruthy()
            }) 
            test('it adds a h1', () => {
                expect(fetch).toHaveBeenCalled();
            })

        })
        describe('createButtonStack', () =>{
            beforeEach(() =>{
                app.createButtonStack()
            })
            test('it exists', () =>{
                expect(app.createButtonStack).toBeTruthy()
            }) 
            test('it adds a h1', () => {
                expect(fetch).toHaveBeenCalled();
            })

        })
        describe('createAddHabbitForm', () =>{
            beforeEach(() =>{
                app.createAddHabbitForm()
            })
            test('it exists', () =>{
                expect(app.createAddHabbitForm).toBeTruthy()
            }) 
            test('it adds a h1', () => {
                expect(fetch).toHaveBeenCalled();
            })

        })
        
        
       

// // BETHAN TESTS
        describe('createEditHabbitForm', () =>{
            beforeEach(() =>{
                app.createEditHabbitForm()
            })
            test('it exists', () =>{
                expect(app.createEditHabbitForm).toBeTruthy()
            }) 
            test('creates a habbit form', () =>{
                
                expect(fetch).toHaveBeenCalled();
            })

        })


        // describe('checkPasswords', () => {
        //     test('it exists', () => {
        //         expect(app.checkPasswords).toBeTruthy()
        //     })
        // })

        

        // describe('checkPasswords', () =>{
        //     beforeEach(() =>{
        //         app.renderRegisterForm()
        //         app.checkPasswords()
        //     })
        //     test('it exists', () =>{
        //         expect(app.checkPasswords).toBeTruthy()
        //     }) 
        //     test('checks the passwords', () =>{
                
        //         expect(fetch).toHaveBeenCalled();
        //     })

        // })
        
         describe('showHabitForm', () =>{
            beforeEach(() =>{
                app.createAddHabbitForm()

            })
            test('it exists', () =>{
                expect(app.showHabitForm).toBeTruthy()
            }) 
            test('it shows the habit form', () => {
                expect(app.showHabitForm()).toHaveBeenCalled();
            })
        })
            
    
    describe('showEditHabitForm', () =>{
            beforeEach(() =>{
                const form = createEditHabbitForm()
                const title = {
                    title:''
                }
                app.showEditHabitForm(form,title)
            })
            test('it exists', () =>{
                expect(app.showEditHabitForm).toBeTruthy()
            }) 
            test('it shows the edit habit form', () => {
                expect(fetch).toHaveBeenCalled();
            })
        })

        
        describe('getStreakInfo', () => {
            test('it exists', () => {
                expect(app.getStreakInfo).toBeTruthy()
            })
        })
        describe('streakUpdater', () => {
            test('it exists', () => {
                expect(app.streakUpdater).toBeTruthy()
            })
        })
        describe('getDay', () => {
            beforeEach(() =>{
                app.getDay()
            })
            test('it exists', () => {
                expect(app.getDay).toBeTruthy()
            })
            test('it adds a h1', () => {
                expect(fetch).toHaveBeenCalled();
            })
        })
        describe('timestamp', () => {
            beforeEach(() =>{
                app.timestamp()
            })
            test('it exists', () => {
                expect(app.timestamp).toBeTruthy()
            })
            test('it adds a h1', () => {
                expect(fetch).toHaveBeenCalled();
            })
        })
        describe('getMotivationalQuote', () => {
            beforeEach(() =>{
                app.getMotivationalQuote()
            })
            test('it exists', () => {
                expect(app.getMotivationalQuote).toBeTruthy()
            })
            test('it adds a h1', () => {
                expect(fetch).toHaveBeenCalled(0);
            })
          
            
        })
        describe('randomNumber', () => {
            beforeEach(() =>{
                app.randomNumber()
            })        
            test('it exists', () => {
                expect(app.randomNumber).toBeTruthy()
            })
            test('it adds a h1', () => {
               
                expect(fetch).toHaveBeenCalled(0)
            })
            
            // expect(fetch).toHaveBeenCalled();
        
        })


         

         describe('changeBackgroundImage', () =>{
            beforeEach(() =>{
                const images = [
                    'image1', 'image2'
                ]
                changeBackgroundImage = jest.fn(() =>{
                    return images[1]
                })
            })
            test('it exists', () =>{
                expect(app.changeBackgroundImage).toBeTruthy()
            }) 
            test('it changes background image', () => {
                expect(changeBackgroundImage).toBeDefined();
            })
        })

       
        
        describe('logManage', () =>{
            beforeEach(() =>{
                
                app.logManage(e)
                
            })
            test('it exists', () =>{
                expect(app.logManage).toBeTruthy()
            }) 
            test('it manages logs', () => {
                expect(fetch).toHaveBeenCalled();
            })
            test('it expects streakUpdater to be run', () =>{
                expect(app.streakUpdater).toHaveBeenCalled();
            })
        })

         describe('render404', () =>{
            beforeEach(() =>{
                app.render404()
            })
            test('it exists', () =>{
                expect(app.render404).toBeTruthy()
            }) 
            test('it renders 404', () => {
                expect(fetch).toHaveBeenCalled();
            })
        })

    
//     })     
})