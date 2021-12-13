const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

const Log = require('../models/Log');

// route to fetch all the logs (likely admin feature)
router.get('/', verifyToken, async (req, res) => {
    try {
        const logs = await Log.all
        res.status(200).json(logs)
    } catch(err){
        res.status(500).json({err})
    }
})

router.delete('/:id', verifyToken, async (req, res) => {

})

module.exports = router