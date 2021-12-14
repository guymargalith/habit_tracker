const Habit = require('../../../models/Habit')
const pg = require('pg');
jest.mock('pg');

const db = require('../../../db_config/init');

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with habits on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Habit.all;
            expect(all).toHaveLength(3)
        })
    });
    
    describe('findById', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = { id: 1, name: 'Test Habit' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await Habit.findByID(1);
            expect(result).toBeInstanceOf(Habit)
        })
    });

    describe('findUserHabits', () => {
        test('it finds a user\'s habits', async () => {
            let habitData = { id: 1, name: 'Test Habit' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await Habit.findUserHabits(1);
            expect(result).toBeInstanceOf(Array)
            expect(result[0]).toBeInstanceOf(Habit)
        })
    });
        
    describe('create', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = { id: 1, name: 'New Habit' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await Habit.create('New Habit');
            expect(result).toBeInstanceOf(Habit)
        })
    });

    describe('destroy', () => {
        test('it resolves with message on successful db query', async () => {
            let habitData = { id: 1, name: 'New Habit' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ id: 1, name: 'New Log' });
            let testHabit = new Habit({ habitData })
            const result = await testHabit.destroy();
            expect(result).toBe('Habit and respective logs were deleted')
        })
    });
})