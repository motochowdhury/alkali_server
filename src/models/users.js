const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name is required'],
        trim: true,
        min: [3, 'Minimum 3 charecter required'],
        max: [30, 'Maximum 30 charecter is acceptable']
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        trim: true,
        toString: true,
        validate: {
            validator: (v)=>{
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
                message: "This is not a valid email"
            }
        },
        unique: true
    }
})

const users = model('Users', userSchema);
module.exports = users;