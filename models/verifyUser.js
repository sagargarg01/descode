const mongoose = require('mongoose');

const verify_userSchema = new mongoose.Schema({

    user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    },

    OTP:{
        type: Number
    }
},{
    timestamps: true
});


const verifyUser = mongoose.model('verifyUser', verify_userSchema);
module.exports = verifyUser;