const Chats = require('../models/chats');
const chatRoom = require('../models/chat_room');
const ChatRoom = require('../models/chat_room');

module.exports.chatSockets = async function(socketServer){

    let room;
    let io = require('socket.io')(socketServer);
    
    io.sockets.on('connection', function(socket){

        console.log('new connection recieved', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        socket.on('join_room', async function(data){
                console.log('joining request received', data.chatroom);

                room = await ChatRoom.findById(data.chatroom);
                socket.join(data.chatroom);
                io.in(data.chatroom).emit('user_joined', data);

        });

        socket.on("send_message", async function (data) {
          console.log(data);

          let newMessage = await Chats.create({
            user: data.user_id,
            message: data.message,
          });
          if(room){
             room.messages.push(newMessage);
             room.save();
          }

          io.in(data.chatroom).emit("receive_message", data);
        });
    });
}