// Internal import
const createError = require("http-errors");
const Users = require("../models/users");
const { default: mongoose } = require("mongoose");

// findUserById function
const findItemById = async(id, options) => {
try {
    // find user byId
    const item = await Users.findById(id, option)
    // if empty user
    if(!item) {throw createError('404', "Item doesn't exist")};
    // return user
    return item;
} catch (error) {
    // mongoDb error handling
    if(error instanceof mongoose.Error) {
        throw createError('500', 'invalid Item id')
    }

    throw error;
}

}

// Export services
module.exports = {findItemById}