const errorResponse = (res, {statusCode = 500, message = "Internal server error"}) => {
    return res.status(statusCode).json({
        sucess: false,
        message,
    })
}

module.exports = {errorResponse}