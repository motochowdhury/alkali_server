// Internal Require
const app = require("./app")
const serverPort = require("./secret")

// App listener
app.listen(serverPort, ()=> {
    console.log(`Server is running at port: http://localhost:${serverPort}`)
})