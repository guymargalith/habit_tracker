const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

const User = require('../models/User');

// route to fetch all the users and their information (likely admin feature)
router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.all
        res.status(200).json(users)
    } catch(err){
        res.status(500).json({err})
    }
})

module.exports = router