const test = (req,res) => {
    console.log(req.body.id)
    res.status(200).send({
    message: "Hey Welcome to the server",
    })
}

module.exports = test;