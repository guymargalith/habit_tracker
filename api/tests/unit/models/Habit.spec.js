const Habit = require('../../../models/Habit')
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');