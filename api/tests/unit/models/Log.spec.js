const Log = require('../../../models/Log')
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');