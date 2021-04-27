const httpStatus = require("http-status-codes");

exports.respondNoResourceFound = (req, res) => {  
    let errorCode = httpStatus.StatusCodes.NOT_FOUND;  
    res.status(errorCode);  
    res.send('404');

};

exports.respondInternalError = (error, req, res, next) => {  
    let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;  
    console.log(`ERROR occurred: ${error.stack}`)  
    res.status(errorCode);  
    res.send('500');
};

exports.logErrors = (error, req, res, next) => {  
    console.error(error.stack);  
    next(error);
};