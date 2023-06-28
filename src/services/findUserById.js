// Internal import
const createError = require("http-errors");
const Users = require("../models/users");
const { default: mongoose } = require("mongoose");

// findUserById function
const findUserById = async(id) => {
try {
    // Avoiding Password
    const option = {password : 0}; 
    // find user byId
    const user = await Users.findById(id, option)
    // if empty user
    if(!user) {throw createError('404', "user doesn't exist")};
    // return user
    return user;
} catch (error) {
    // mongoDb error handling
    if(error instanceof mongoose.Error) {
        throw createError('500', 'invalid user id')
    }

    throw error;
}

}

// Export services
module.exports = {findUserById}