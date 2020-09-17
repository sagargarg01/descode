const Chats = require('../models/chats');
const ChatRoom = require('../models/chat_room');

module.exports.chatSockets = async function(socketServer){

    let io = require('socket.io')(socketServer);
    
    io.sockets.on('connection', function(socket){
        console.log('new connection recieved', socket.id);

        socket.on('join_room', async function(data){
                console.log('joining request received', data.chatroom);

                  room = await ChatRoom.findById(data.chatroom);
                  socket.join(data.chatroom);
                  io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on("send_message", async function (data) {

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




// Server side
// Load the socker server
// on every join event --> socket.join
// on every leave event --> socket.leave


// client side
// connect to socket as soon as the page loads
// click a chatroom name

// CALL FUNCTION
// use the global socket variable to join that room + store the current chatroom in a variable
// click another chatroom name
// leave the current room and connect to the new room


// OR
// Connect to all the chatrooms which are on the page when the page loads 