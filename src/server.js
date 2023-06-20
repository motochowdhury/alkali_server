// Internal Require
const express = require("express");
const app = express();
const port = 5000;
const morgan = require("morgan");

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

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
    res.status(404).send({
        message:"route not found"
    })
}
) 


// App listener
app.listen(port, ()=> {
    console.log(`Server is running at port: http://localhost:${port}`)
})