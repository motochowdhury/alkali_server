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
res.send("Welcome to server")
})

// App listener
app.listen(port, ()=> {
    console.log(`Server is running at port: http://localhost:${port}`)
})