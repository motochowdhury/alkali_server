const express = require("express");
const app = express();
const morgan = require("morgan");
const createError = require('http-errors');
const bodyParser = require("body-parser");
// const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const expressRouter = require("./routers/userRoute");
const seedRouter = require("./routers/seedRouter");
const { errorResponse } = require("./controller/responseController");

// rate limter middleware

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'to many request from this ip address'
})

// Middleware
app.use(rateLimiter)
// app.use(xssClean);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
// Seed api
app.use('/seed',seedRouter)
// get all user
app.use('/api',expressRouter)
// get a single user
app.use('/api', expressRouter)

// Post request
app.post("/test", (req,res)=>{
    res.status(200).send({
        message: "post: api is working fine"
    })
})

// Put request
app.put("/test", (req,res)=>{
    res.status(200).send({
        message: "put: api is working fine"
    })
})

// delete request
app.delete("/test", (req,res)=>{
    res.status(200).send({
        message: "delete: api is working fine"
    })
})


// client error handling
app.use((req,res,next) => {
    next(createError(404, 'route not found'))
}
) 

// server error handler
app.use((err,req,res,next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
})


module.exports = app