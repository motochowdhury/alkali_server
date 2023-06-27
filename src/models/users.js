const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");

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
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                message: "This is not a valid email"
            }
        },
        unique: true
    },
    password: {
        type: String,
        require: [true, 'password is must be required'],
        minlength: [6, "Mininux length of password is 6 character"],
        set: (v)=> bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
})

const users = model('Users', userSchema);
module.exports = users;