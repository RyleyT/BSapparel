const httpStatus = require("http-status-codes")

exports.respondPageNotFound = (req, res) => { //404 error handler
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.sendFile(`./public/${errorCode}.html`, {
        root: "./"
    });
};

exports.respondInternalError = (req, res) => { //500 error handler
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.status(errorCode);
    res.sendFile(`./public/${errorCode}.html`, {
        root: "./"
    });
};

exports.logErrors = (error, req, res, next) => {
    console.error(error.stack);
    console.log(error.stack);
    next(error);
};