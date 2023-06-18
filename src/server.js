// Internal Require
const express = require("express");
const app = express();
const port = 5000;



// App listener
app.listen(port, ()=> {
    console.log(`Server is running at port: http://localhost:${port}`)
})