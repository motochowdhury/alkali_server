const express = require("express");
const app = express();
const morgan = require("morgan");
const createError = require('http-errors');
const bodyParser = require("body-parser");

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// Custom MiddleWare
const isLoggedIn = (req,res,next) => {
    const loggedIn = false;

    if(loggedIn){
        console.log("middleWare working")
        req.body.id = 401
        next()
    } else {
        return res.send({
            message: "please login first"
        })
    }
}

// Get request
// Root derectory
app.get("/", isLoggedIn, (req,res) => {
    console.log(req.body.id)
    res.status(200).send({
    message: "Hey Welcome to the server"
    })
})

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
    return res.status(err.status || 500).json({
        success: false,
        message: err.message
    })
})


module.exports = app;