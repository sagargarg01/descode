class chatEngine{constructor(s,e){this.chatBox=$("#"+s),this.userEmail=e,this.socket=io.connect("http://localhost:3000"),console.log(this.socket),this.userEmail&&this.connectionHandler()}connectionHandler(){let s=this;this.socket.on("connect",(function(){console.log("connection established using sockets...!"),s.socket.emit("join_room",{user_email:s.userEmail,chatroom:"codeial"}),s.socket.on("user_joined",(function(s){console.log("a user joined!",s)}))})),$("#send-message").click((function(){let e=$("#chat-message-input").val();""!=e&&s.socket.emit("send_message",{message:e,user_email:s.userEmail,chatroom:"codeial"}),$("#chat-message-input").val("")})),s.socket.on("receive_message",(function(e){console.log("message received",e);let i="other-message";e.user_email==s.userEmail&&(i="self-message"),"self-message"===i?$("#chat-messages-list").append(`<div class="outgoing_msg">\n                <div class="sent_msg">\n                   <p>${e.message}</p>\n                </div>\n             </div>`):$("#chat-messages-list").append(`<div class="incoming_msg">\n                <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png"\n                      alt="user">\n                </div>\n                <div class="received_msg">\n                   <div class="received_withd_msg">\n                      <p>${e.message}</p>\n                      <small class="time_date"> ${e.user_email}</small>\n                   </div>\n                </div>\n             </div>`)}))}}