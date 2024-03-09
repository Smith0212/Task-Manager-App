const express = require('express');
const app = new express();
const tasks = require('./routers/tasks')
const connectDB = require("./db/connect")
require("dotenv").config()
const notFound = require("./middleware/not-found")


// middelware
app.use(express.static("./public")) //this static method of express is taking path of folder (containing all the file we want to send to the browser)
app.use(express.json())  // to having data in req.body in json form

//route
app.use('/api/v1/tasks', tasks)


app.use(notFound)

const port = 3000;
// first we are connecting to DB after than our server start listening
// connectDB will return promise so we can use "async"
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    }
    catch (err) {
        console.log(err)
    }
}

start()



