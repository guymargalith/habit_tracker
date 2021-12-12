const Log = require('../../../models/Log')
const pg = require('pg');
jest.mock('pg');

const db = require('../../../db_config/init');

describe('Log', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())
        
    describe('all', () => {
        test('it resolves with logs on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Log.all;
            expect(all).toHaveLength(3)
        })
    });
                
    describe('findById', () => {
        test('it resolves with log on successful db query', async () => {
            let logData = { id: 1, name: 'Test Log' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ logData] });
            const result = await Log.findByID(1);
            expect(result).toBeInstanceOf(Log)
        })
    });

    describe('create', () => {
        test('it resolves with log on successful db query', async () => {
            let logData = { id: 1, name: 'New Log' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ logData ] });
            const result = await Log.create('New Log');
            expect(result).toBeInstanceOf(Log)
        })
    });
    
    // describe('destroy', () => {
    //     test('it resolves with message on successful db query', async () => {
    //         let logData = { id: 1, name: 'New Log' }
    //         jest.spyOn(db, 'query')
    //             .mockResolvedValueOnce({ id: 1, name: 'New Log' });
    //         let testLog = new Log({ logData })
    //         const result = await testLog.destroy();
    //         expect(result).toBe('Log 1 was deleted')
    //     })
    // });
    
    
})