// Internal Require
const app = require("./app")
const connectDb = require("./config/db")
const {serverPort} = require("./secret")

// App listener
app.listen(serverPort, async()=> {
    console.log(`Server is running at port: http://localhost:${serverPort}`)
    // run mongoDB connection
    await connectDb()
})