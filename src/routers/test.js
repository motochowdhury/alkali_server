const express = require("express");
const expressRouter = express.Router();

// Get request
// Root derectory
expressRouter.get("/", (req,res) => {
    console.log(req.body.id)
    res.status(200).send({
    message: "Hey Welcome to the server"
    })
})
