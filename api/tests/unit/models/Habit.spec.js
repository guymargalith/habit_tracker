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
    
    describe('findAllLogs', () => {
        test('it finds all logs associated with a habit', async () => {
            let habitData = { id:2}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows:[{date:123}]});
            let testHabit = new Habit({ habitData })
            const result = await testHabit.findAllLogs;
            expect(result).toBeInstanceOf(Array)
            // expect(result[0]).toBeInstanceOf()
        })
    });
    describe('findUserHabits', () => {
        test('it finds a user\'s habits', async () => {
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
                .mockResolvedValue();
            let testHabit = new Habit({ habitData })
            const result = await testHabit.destroy();
            expect(result).toBe('Habit and respective logs were deleted')
        })
    });

    describe('update', () => {
        test('it resolves with message on successful db query', async () => {
            let habitData = { id: 1, name: 'New Habit', frequency: 3, user_id: 1}
            let habitIn = { id: 1, name: 'New Habit', frequency: 3, userId: 1}
            jest.spyOn(db, 'query')
                .mockResolvedValue({rows: [habitData]});
            const result = await Habit.update(habitIn);
            expect(result).toEqual(habitIn)
        })
    });

    describe('streak', () => {
        test('it resolves with message on successful db query', async () => {
            let habitData = { id: 1, name: 'New Habit', frequency: 1 }
            jest.spyOn(db, 'query')
                .mockResolvedValue({rows:[{date:1639267200}]});
            let testHabit = new Habit( habitData )
            const result = await testHabit.streak;
            expect(result).toBeDefined();
        })
    });

    describe('destroy', () => {
        test('it resolves with message on successful db query', async () => {
            let habitData = { id: 1, name: 'New Habit' }
            jest.spyOn(db, 'query')
                .mockResolvedValue();
            let testHabit = new Habit({ habitData })
            const result = await testHabit.destroy();
            expect(result).toBe('Habit and respective logs were deleted')
        })
    });
})