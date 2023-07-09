// Internal import
const createError = require("http-errors");
const { mongoose } = require("mongoose");

// findUserById function
const findItemById = async(Model,id, options = {}) => {
try {
    // find user byId
    const item = await Model.findById(id, options)

    // if empty user
    if(!item) {throw createError('404', `${Model.modelName} doesn't exist`)};
    
    // return user
    return item;
} catch (error) {
    // mongoDb error handling
    if(error instanceof mongoose.Error) {
        throw createError('500', `invalid ${Model.modelName} id`)
    }

    throw error;
}

}
// Export services
module.exports = {findItemById}