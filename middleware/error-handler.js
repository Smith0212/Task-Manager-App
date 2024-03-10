const { CustomeAPIError } = require("../errors/custom-error")  //this is use to check that the error is instance of this "customAPIError" class or not

const errorHandlerMW = (err, req, res, next) => {

    if (err instanceof CustomeAPIError){
        return res.status(err.statusCode).json({msg : err.message})        // handle all the error which is instance of custom class
    }                                                           // "this msg will display when syntext of 'id' is correct but not matching the value"

    return res.status(500).json({msg : "Something went wronggg!, Please try again"})   // '''To catch the error of try catch block (from async.js)'''
}                                                                               // "this msg will display when syntext of 'id' is not correct (changing length of id)"

module.exports = errorHandlerMW

// if error occur in controller then it will return in app.js from "app.use('/api/v1/tasks', tasks)"
// so we will import this function in app.js