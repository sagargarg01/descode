
class chatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('https://descode.herokuapp.com/messages/allchats'); 

        if (this.userEmail) {
            this.connectionHandler();
        }

    }

    connectionHandler() {
        let self = this;

        this.socket.on('connect', function () {
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function (data) {
                console.log('a user joined!', data);
            })


        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function () {
            let msg = $('#chat-message-input').val();

            if (msg != '') {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
            $('#chat-message-input').val('');
        });

        self.socket.on('receive_message', function (data) {
            console.log('message received', data);

            let messageType = 'other-message';

            if (data.user_email == self.userEmail) {
                messageType = 'self-message';
            }

            if (messageType === 'self-message') {
                // self - message
                $('#chat-messages-list').append(`<div class="outgoing_msg">
                <div class="sent_msg">
                   <p>${data.message}</p>
                </div>
             </div>`)
            }
            else {
                // other user message
                $('#chat-messages-list').append(`<div class="incoming_msg">
                <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png"
                      alt="user">
                </div>
                <div class="received_msg">
                   <div class="received_withd_msg">
                      <p>${data.message}</p>
                      <small class="time_date"> ${data.user_email}</small>
                   </div>
                </div>
             </div>`)
            }
        })
    }

}
