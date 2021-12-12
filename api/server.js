const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require('./controllers/users')
const habitRoutes = require('./controllers/habits')
const authRoutes = require('./controllers/auth')

server.use('/users', userRoutes)
server.use('/habits', habitRoutes)
server.use('/auth', authRoutes)

server.get('/', (req, res) => res.send('Welcome to the library'))

module.exports = server