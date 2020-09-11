const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  
   name: {
      type: String,
      required: true
   }
   ,
   messages: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Chats'
      }
   ]
});

const ChatRoom = mongoose.model('ChatRoom', chatSchema);
module.exports = ChatRoom;