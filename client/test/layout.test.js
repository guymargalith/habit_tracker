/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
// global.fetch = require("jest-fetch-mock"); 
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
    describe('head', () => {
        test('it has a title', () => {
            const title = document.querySelector('head title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe("Trackit")
        })
    })
    describe('body', () => {
        describe('There is a main section', () => {
            let mainSection;
            beforeEach(() => {
                mainSection = document.querySelector('main')
            })
            test('it exists', () => {
                expect(mainSection).toBeTruthy();
            })
            test('it has id', () => {
                expect(mainSection.id).toBe('main-section')
            })
        })
        
})
})  