const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

// const User = require('../models/User');
const Habit = require('../models/Habit');

// route to fetch all habits for all users (likely admin feature)
router.get('/', verifyToken, async (req, res) => {
    try{
        const habits = await Habit.all
        res.status(200).json(habits)
    } catch(err){
        res.status(500).json({err})
    }
})

// Route to fetch one habit using its id (no client side purpose yet)
router.get('/:id', verifyToken, async (req, res) => {
    try{
        const habit = await Habit.findByID(req.params.id)
        res.status(200).json(habit)
    } catch(err){
        res.status(404).json({err})
    }
})

// Route to fetch all the habits of a specific user using the user's id
router.get('/specific/:id', verifyToken, async (req, res) => {
    try{
        const habits = await Habit.findUserHabits(req.params.id)
        res.status(200).json(habits)
    } catch(err){
        res.status(404).json({err})
    }
})

// Route to create a new habit
router.post('/', verifyToken, async (req, res) => {
    try{
        const habit = await Habit.create(req.body)
        res.status(201).json(habit)
    } catch(err){
        res.status(422).json({err})
    }
})

router.get('/:id/streak', verifyToken, async (req, res) => {
    try{
        const habit = await Habit.findByID(req.params.id)
        const streak = await habit.streak
        res.status(200).json({streak: streak})
    } catch(err){
        res.status(404).json({err})
    }
})

module.exports = router