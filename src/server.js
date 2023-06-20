// Internal Require
const app = require("./app")

// App listener
app.listen(5000, ()=> {
    console.log(`Server is running at port: http://localhost:5000`)
})