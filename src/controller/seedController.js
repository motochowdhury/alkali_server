const users = require("../models/users");
const data = require('../data')
const seedApi = async(req,res,next) => {
    try {
        await users.deleteMany({})
        const insertedUser = await users.insertMany(data.users)

        return res.status(201).json(insertedUser)
    } catch (error) {
        next(error)
    }
}

module.exports = seedApi;