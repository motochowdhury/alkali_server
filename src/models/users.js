const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name is required'],
        trim: true,
        min: [3, 'Minimum 3 charecter required'],
        max: [30, 'Maximum 30 charecter is acceptable']
    }
})