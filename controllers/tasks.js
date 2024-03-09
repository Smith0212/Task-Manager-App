const Task = require("../Models/task")


const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        // console.log(tasks)
        res.status(200).json({ tasks })
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        // console.log(task)
        res.status(201).json({ task })
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: `No Task with ID ${taskID}` }) // this msg will display when syntext of id is correct but not matching the value
        }
        res.status(201).json({ task })
    }
    catch (err) {
        res.status(500).json({ msg: err }) // this msg will display when syntext of id is wrong(amount of char in id is not match)
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true }) //"new" : will return edited(updated) value to the task varable
        if (!task) {                                                                                      //"runValidators" : will run all the valodation on updated data                     
            return res.status(404).json({ msg: `No Task with ID ${taskID}` }) 
        }  
        res.status(200).json({ task })                                                                                            
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }                                                                                                 
}


const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: `No Task with ID ${taskID}` })
        }
        res.status(200).json({ task })
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
}



module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}