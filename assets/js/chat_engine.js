let chatArea = $('.message_box_container');
var chatList = [];
var userEmail;
var currentChatRoom;
var userId;
var otherUser;

var socket = io.connect('http://localhost:5000'); 
// socket.on('connect', function () {
//     console.log('connection established using sockets...!');
// });

var checkAndAssignRoom = () => {
    if(!chatList.includes(currentChatRoom)){
        joinRoom();
        chatList.push(currentChatRoom);
    }
    messageSending();
}

    var joinRoom = () => {
        socket.emit('join_room', {
            user_email: userEmail,
            chatroom: currentChatRoom
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
                    chatroom: currentChatRoom
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
            let messageList = $(`#chat-messages-list-${currentChatRoom}`);
            let messageType = 'other-message';
            let {user_email, message} = data;

            if (user_email == userEmail) {
                messageType = 'self-message';
            }

            

            if (messageType === 'self-message') {
                // self - message
                messageList.append(`
                    <div class="outgoing_msg">
                        <div class="sent_msg">
                            <p>${message}</p>
                        </div>
                    </div>`
                )
            }
            else {
                // other user message
                messageList.append(`
                    <div class="incoming_msg">
                    ${ 
                        (otherUser.avatar) ? 
                            `<div class="rounded-circle"> <img src="${otherUser.avatar}" width="40" alt="user"></div>`
                        : 
                            `<div class="incoming_msg_img"> <img src="//ptetutorials.com/images/user-profile.png" width="40" alt="user"></div>`
                    } 
                        <div class="received_msg">
                            <div class="received_withd_msg">
                                <p>${message}</p>
                            </div>
                        </div>
                    </div>`
                )
            }
        })

// construct ROOM for Chat
function constructChatROOM(chatRoom, user, friend){
    return `
        <div class="chat_header">
            <div class="back_button"><i class="fas fa-chevron-left"></i></div>
            ${
                (friend.avatar) 
                ?  
                `<div><img class="rounded-circle" width="45" src="${friend.avatar}" alt=""></div>`
                : 
                `<div><img class="rounded-circle" width="45" src="//ptetutorials.com/images/user-profile.png" alt=""></div>`
            }
            
            <div class="name">${friend.name}</div>
        </div>
        <div class="mesgs">
            <div class="msg_history" id="chat-messages-list-${chatRoom._id}">
            ${chatRoom.messages.map(
              (chat) =>
                `${
                  (user._id === chat.user)
                    ? 
                    `<div class="outgoing_msg">
                        <div class="sent_msg">
                            <p>${chat.message}</p>
                        </div>  
                    </div>`
                    : 
                    `<div class="incoming_msg">
                        ${ 
                            (friend.avatar) ? 
                                `<div class="incoming_msg_img"> <img class="rounded-circle" src="${friend.avatar}" width="40" alt="user"></div>`
                                    : 
                                `<div class="incoming_msg_img"> <img src="//ptetutorials.com/images/user-profile.png" width="40" alt="user"></div>`
                        } 
                            <div class="received_msg">
                                <div class="received_withd_msg">
                                    <p>          
                                    ${chat.message}
                                    </p>
                                </div>
                            </div>
                        </div>`
                } `).join('')
            }
            </div>
            <div class="type_msg">
                <div class="input_msg_write">
                    <input type="text" id="chat-message-input" class="write_msg" placeholder="Type a message" />
                    <button class="msg_send_btn" id="send-message" type="submit"><i class="fa fa-paper-plane-o"aria-hidden="true"></i></button>
                </div>
            </div>
        </div>`
}

// handle clicks on each chatroom present in the list
$('.chat_list').each(function(){

    $(this).click(function(){
        let friendID = $(this).attr('data-friendid')
        highLightBox(friendID);

        $.ajax({
            type:'get',
            url:  `/messages/chatroom/?friend=${friendID}`,
            success: function(data){
                let {chatRoom, user, friend} = data.data;
    
               let room = constructChatROOM(chatRoom, user, friend);
               chatArea.empty(); // removes previous chat
               chatArea.append(room); // addIn new Chat
               hideList();
               activateBackButton();

               //setting in the variable
               currentChatRoom = chatRoom._id;
               userEmail = user.email;
               userId = user._id;
               otherUser = friend;
               checkAndAssignRoom();
                             
            },
            error: function (error) {
                console.log(error.responseText);
            }
        })
    })
});

// UI 

function highLightBox(friendId){
    // first remove highlight from previous
    $('.inbox_chat > div').removeClass('active_chat');

    // hightlight current friendbox
    $(`#friend-${friendId}`).addClass('active_chat');
}

function hideList(){
    if(window.innerWidth <= 420){
        $('.inbox_people').css('display', 'none');
    }
};

function activateBackButton(){
    console.log($('.back_button'));
    $('.back_button').click(function(){
        $('.inbox_people').css('display', 'block');
    });
}
