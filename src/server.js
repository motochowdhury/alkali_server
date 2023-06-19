// Internal Require
const express = require("express");
const app = express();
const port = 5000;
const morgan = require("morgan");

// Middleware
app.use(morgan("dev"));

// Get request
// Root derectory
app.get("/", (req,res) => {
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
app.post("/test", (req,res)=>{
    res.status(200).send({
        message: "put: api is working fine"
    })
})

// delete request
app.post("/test", (req,res)=>{
    res.status(200).send({
        message: "delete: api is working fine"
    })
})

// App listener
app.listen(port, ()=> {
    console.log(`Server is running at port: http://localhost:${port}`)
})