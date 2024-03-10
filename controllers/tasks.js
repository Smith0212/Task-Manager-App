const Task = require("../Models/task")
const asyncWrapper = require("../middleware/async")  // use to avoid the try catch block in every function
const { createCustomError } = require("../errors/custom-error")


const getAllTasks = asyncWrapper(async (req, res) => {

        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    
})

const createTask = asyncWrapper(async (req, res) => {

        const task = await Task.create(req.body)
        res.status(201).json({ task })
    
})

const getTask = asyncWrapper(async (req, res ,next) => {
    
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        console.log(!task)
        if (!task) {  
            console.log("hello")                                                             // this next function is handover the control to middleware "error-handler.js"
            return next(createCustomError(`No Task with ID ${taskID}`, 404));   // handle error using custom error class (custom-error.js) 
                                                                                // "this msg will display when syntext of id is correct but not matching the value"
        }                                                                      
        res.status(201).json({ task })

})

const updateTask = asyncWrapper(async (req, res, next) => {

        const { id: taskID } = req.params
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true }) //"new" : will return edited(updated) value to the task varable
        if (!task) {                                                                                            //"runValidators" : will run all the valodation on updated data                     
            return next(createCustomError(`No Task with ID ${taskID}`, 404))   // handle error using custom error class (custom-error.js) 
        }                                                                      // this next function is handover the control to middleware "error-handler.js" 
        res.status(200).json({ task })  

})


const deleteTask = asyncWrapper(async (req, res, next) => {

        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID })
        if (!task) {
            return next(createCustomError(`No Task with ID ${taskID}`, 404))  // handle error using custom error class (custom-error.js) 
        }                                                                     // this next function is handover the control to middleware "error-handler.js"
        res.status(200).json({ task })

})



module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}