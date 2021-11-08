const express = require('express');
const router = new express.Router();
const Task = require('../models/taskModel')


router.get('/get-tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        if(!tasks) res.send([])
        res.send(tasks)
    }catch(error){
        console.log(error)
    }
})

router.put('/create-new-task', async (req, res) => {
    try {
        const task = new Task({
            content: req.body.content,
            statusIsCompleted: false
        })

        try {
            task.save()
        } catch (error) {
            console.log(error)
        }
        res.send('ok')

    } catch (error) {
        console.log(error)
    }
})

router.patch('/update-task', async (req, res) => {
    console.log(req.body.id)
    try {
        const task = await Task.findById(req.body.id)
        task.statusIsCompleted = !task.statusIsCompleted

        try {
            task.save()
        } catch (error) {
            console.log(error)  
        }

        res.send('ok')
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete-task', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.body.id);

        res.send('ok')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router 