const express = require('express');
const router = new express.Router();
const Task = require('../models/taskModel')

router.get('/get-tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    }catch(error){
        res.status(500).send({
            message: error
        })
    }
})

router.put('/create-new-task', async (req, res) => {
    try {
        const task = new Task({
            content: req.body.content,
            statusIsCompleted: false
        })
        await task.save()
        res.status(200).send(task)
    }catch(error){
        res.status(500).send({
            message: error
        })
    }
})

router.patch('/update-task', async (req, res) => {
    try {
        const task = await Task.findById(req.body.id)
        task.statusIsCompleted = !task.statusIsCompleted
        await task.save()
        res.sendStatus(200)
    }catch(error){
        res.status(500).send({
            message: error
        })
    }
})

router.delete('/delete-task', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.body.id);
        res.sendStatus(200)
    }catch(error){
        res.status(500).send({
            message: error
        })
    }
})

module.exports = router 