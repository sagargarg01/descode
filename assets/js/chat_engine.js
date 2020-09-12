var chatPlace ;
let chatArea = $('.mesgs');

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


$('.chat_ib a').each(function(){
    let self = this;

    $(this).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url: $(self).prop('href'),
            success: function(data){
    
               console.log(data);
               let room = constructChatROOM(data.data.chatRoom, data.data.user);
               chatArea.empty();
               chatArea.append(room);
              
               makeChats(data.data.chatRoom._id, data.data.user.email, data.data.user._id);
               
            },
            error: function (error) {
                console.log(error.responseText);
            }
        })
    })
})

// lets create a function rather than a class to perform the same task


function makeChats(chatRoom, userEmail, userId) {

    io.disconnect(`/${chatPlace}`)

    var chatBox = $('#user-chat-box');
    let socket = io.connect('http://localhost:5000');
    
        if(chatPlace != chatRoom){

            socket.on('connect', function () {
                console.log('connection established using sockets...!');

                socket.emit('join_room', {
                    user_email: userEmail,
                    chatroom: chatRoom
                });
    
                if(chatPlace != chatRoom){
                    console.log(chatPlace);
                socket.on('user_joined', function (data) {
                    // $('#chat-messages-list').append(`<div> new user joined ${data.user_email} </div>`)
                    console.log('a user joined!', data);
                     chatPlace = chatRoom;
                })
            }
    
            });
           
        }

        function sendMessage() {
            console.log('i am here');
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
        })

        socket.on('receive_message', function (data) {
            console.log('message received', data);

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
    }