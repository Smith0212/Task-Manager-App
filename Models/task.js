const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
        maxlength: [20, "Legnth should be less then 20 charactor"],
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model("Task", TaskSchema)