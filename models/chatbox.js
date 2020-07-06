const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
   user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   message: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Message'
      }
   ]
});

const ChatBox = mongoose.model('ChatBox', chatSchema);
module.exports = ChatBox;