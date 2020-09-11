const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }
   ,
   message: {
      type: String
   }
});

const Chats = mongoose.model('Chats', chatSchema);
module.exports = Chats;