let chatArea = $('.mesgs');
var chatList = [];
var userEmail;
var chatRoom;
var userId;

var socket = io.connect('http://localhost:5000'); 
// socket.on('connect', function () {
//     console.log('connection established using sockets...!');
// });

var checkAndAssignRoom = () => {

    if(!chatList.includes(chatRoom)){
        joinRoom();
        chatList.push(chatRoom);
    }
    messageSending();
}

    var joinRoom = () => {
        socket.emit('join_room', {
            user_email: userEmail,
            chatroom: chatRoom
        });
    }
    
    // socket.on('user_joined', function (data) {
    //      console.log('a user joined!', data);
    // });

    var messageSending = () => {
        function sendMessage() {
            let msg = $('#chat-message-input').val();

            if (msg != '') {
                socket.emit('send_message', {
                    message: msg,
                    user_id: userId,
                    user_email: userEmail,
                    chatroom: chatRoom
                    });
                }
                $('#chat-message-input').val('');
            }

            // CHANGE :: send a message on clicking the send message button
            $('#send-message').click(sendMessage);

            $('input').keydown(function(event){
                if(event.which === 13 && event.shiftKey == false){
                    sendMessage();
                    event.preventDefault();
                }
            });
    }
    

        socket.on('receive_message', function (data) {
            // console.log('message received', data);

            let messageType = 'other-message';

            if (data.user_email == userEmail) {
                messageType = 'self-message';
            }

            if (messageType === 'self-message') {
                // self - message
                $(`#chat-messages-list-${chatRoom}`).append(`<div class="outgoing_msg">
                <div class="sent_msg">
                   <p>${data.message}</p>
                </div>
             </div>`)
            }
            else {
                // other user message
                $(`#chat-messages-list-${chatRoom}`).append(`<div class="incoming_msg">
                <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png"
                      alt="user">
                </div>
                <div class="received_msg">
                   <div class="received_withd_msg">
                      <p>${data.message}</p>
                   </div>
                </div>
             </div>`)
            }
        })

// construct ROOM for Chat
function constructChatROOM(chatRoom, user){

    return `
            <div class="msg_history" id="chat-messages-list-${chatRoom._id}">
            ${chatRoom.messages.map(
              (chat) =>
                `${
                  user._id === chat.user
                    ? `<div class="outgoing_msg">
                            <div class="sent_msg">
                                <p>${chat.message}</p>
                            </div>  
                        </div>`
                    : `<div class="incoming_msg">
                                <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png"
                                alt="user">
                            </div>
                            <div class="received_msg">
                            <div class="received_withd_msg">
                                <p>          
                                ${chat.message}
                                </p>
                            </div>
                            </div>
                        </div>`
                } `
            ).join('')}
                </div>
                <div class="type_msg">
                <div class="input_msg_write">
                    <input type="text" id="chat-message-input" class="write_msg" placeholder="Type a message" />
                    <button class="msg_send_btn" id="send-message" type="submit"><i class="fa fa-paper-plane-o"
                            aria-hidden="true"></i></button>
                </div>
            </div>
    `
}

// handle clicks on each chatroom present in the list
$('.chat_ib a').each(function(){
    let self = this;

    $(this).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url: $(self).prop('href'),
            success: function(data){
    
               let room = constructChatROOM(data.data.chatRoom, data.data.user);
               chatArea.empty();
               chatArea.append(room);

               chatRoom = data.data.chatRoom._id;
               userEmail = data.data.user.email;
               userId = data.data.user._id;
               checkAndAssignRoom();
                             
            },
            error: function (error) {
                console.log(error.responseText);
            }
        })
    })
});