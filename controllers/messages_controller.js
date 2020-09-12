const ChatBox = require('../models/chat_room');
const chats = require('../models/chats');
const User = require('../models/user');

module.exports.userChats = function(req, res){

   return res.render('messages',{
      title: "Messages"
   });
}


module.exports.chatRoom = async function(req, res){

   try {
      let user = await User.findById(req.query.user);
      let name = req.query.chatroom;
      let chatRoom = await ChatBox.findOne({name : name}).populate('messages');
   
      if(chatRoom){}
      else{
         // chatRoom doesnt exist -> create a new one
         chatRoom =  await ChatBox.create({
            name: name
         });
      }
   
      res.status(200).json({
         data: {
            chatRoom : chatRoom,
            user: user
         },
         message: "SUCCESS"
      })   

   } catch (error) {
      console.log('error', error);
      return;
   }

}