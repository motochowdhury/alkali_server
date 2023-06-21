// Internal Require
require('dotenv').config();
const app = require("./app")
const serverPort = process.env.SERVER_PORT || 5001

// App listener
app.listen(serverPort, ()=> {
    console.log(`Server is running at port: http://localhost:${serverPort}`)
})