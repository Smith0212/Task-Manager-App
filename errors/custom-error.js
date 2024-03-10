// we have create this custom class of Error class
// all the 404 errors in the controller will return instance of this "CustomeErrorAPI" class 

class CustomeAPIError extends Error {         
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}


const createCustomError = (msg, statusCode) => {     // this function returns instence of above custom class 
    return new CustomeAPIError(msg, statusCode)
}

module.exports = { createCustomError, CustomeAPIError }     // we are using this "createCustomError" function in contollers (to responde 404 errors)