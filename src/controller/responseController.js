// For handling error
const errorResponse = (res, {statusCode = 500, message = "Internal server error"}) => {
    return res.status(statusCode).json({
        sucess: false,
        message,
    })
}

// For handling success response
const successResponse = (res, {statusCode = 200, message = "Success done",palyload}) => {
    return res.status(statusCode).json({
        sucess: true,
        message,
        palyload
    })
}

module.exports = {errorResponse}