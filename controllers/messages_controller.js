const User = require('../models/user');
const ChatRoom = require('../models/chat_room');

module.exports.userChats = async function(req, res){

   try {
      
      let friendList = await User.findById(req.user.id).populate('friendships', 'name email avatar');
      console.log(friendList);

      return res.render('messages',{
         title: "Messages",
         friendList: friendList.friendships
      });

   } catch (error) {
      console.log('error', error);
      return res.redirect('back');
   }
}


module.exports.chatRoom = async function(req, res){

   try {
      if(req.xhr){
      let user = await User.findById(req.query.user);
      let friend = await User.findById(req.query.friend);
      // find chatroom
      let chatRoom;

      chatRoom = await ChatRoom.findOne({user1: user._id, user2: friend._id}).populate('messages');
      if(chatRoom == undefined){chatRoom = await ChatRoom.findOne({user1: friend._id, user2: user._id}).populate('messages');}

      if(chatRoom == undefined){
         // chatroom doesnt exist
         // create chatroom
         chatRoom = ChatRoom.create({
            user1: user._id,
            user2: friend._id
         });

         console.log('chatroom created', chatRoom);
      }
   
      return res.status(200).json({
         data: {
            chatRoom,
            user
         },
         message: "SUCCESS"
      }); 
      }
      else{
         return res.redirect('back');
      }

   } catch (error) {
      console.log('error', error);
      return;
   }

}