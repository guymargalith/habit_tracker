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

// route for creating a log
router.post('/', verifyToken, async (req, res) => {
    try {
        const log = await Log.create(req.body)
        res.status(201).json(log)
    } catch(err){
        res.status(500).json({err})
    }
})

// route for deleting a specific log
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const log = await Log.findByID(req.params.id)
        await log.destroy()
        res.status(204)
    } catch(err){
        res.status(500).json({err})
    }
})

module.exports = router