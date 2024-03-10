const asyncWrapper = (fn) => {               // fn : is controller folder function 
    return async(req, res, next) => {
        try{
            await fn(req, res, next)
        }
        catch (err) {
            next(err)  // we need to handle this in next middleware (error-handler.js)
        }
    }
}

module.exports = asyncWrapper    // import in controller to avoid try catch in every function 