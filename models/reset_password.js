const mongoose = require('mongoose');
const crypto = require('crypto');

const reset_passwordSchema = new mongoose.Schema({

    user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    },

    accesstoken:{
        type: String
    },

    isvalid: {
        type:  Boolean
    }

},{
    timestamps: true
});


const reset_passwordToken = mongoose.model('reset_passwordToken', reset_passwordSchema);
module.exports = reset_passwordToken;