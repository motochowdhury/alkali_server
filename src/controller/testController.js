const user = require("../models/users");

const test = (req,res) => {
    console.log(req.body.id)
    res.status(200).send({
    message: "Hey Welcome to the server",
    user
    })
}

module.exports = test;