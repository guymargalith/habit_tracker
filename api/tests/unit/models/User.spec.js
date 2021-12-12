const User = require('../../../models/User')
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');