const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, "enter username"]
    },
    email: {
        type: String,
        // required: [true, "enter email"]
    },
    password: {
        type: String,
        minLength: 6,
        select: true,
    },
    phone: {
        type: String,
    },
    location: {
        type:String,
    },
    subscription:{
        type:String,
        default:'InActive'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    
    resetPasswordToken: String,
    resetPasswordTime: Date,

});

const User = mongoose.model('User',userSchema);

module.exports = User;