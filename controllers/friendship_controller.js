const User = require('../models/user');
const Friendship = require('../models/friendship');
const Chatroom = require('../models/chatbox');


module.exports.createFriensdhip = async function (req, res) {

    try{
    let toUser = await User.findById(req.params.id);
    let fromUser = await User.findById(req.user.id);

    if(!fromUser.friendships.includes(req.params.id)){

        fromUser.friendships.push(req.params.id);
        fromUser.save();
        toUser.friendships.push(req.user.id);
        toUser.save();

        // let chat_room = await Chatroom.create({
        //     user1: toUser,
        //     user2: fromUser
        // });

        // fromUser.chatlist.push(chat_room.id);
        // fromUser.save();
        // toUser.chatlist.push(chat_room.id);
        // toUser.save();

        req.flash('success', 'Friend Added Successfully');
    }
    else{
        req.flash('error', 'Friend Already Exist');
    }
    return res.redirect('back');

    }catch(err){
        console.log("Error in creating friends", err);
        return res.redirect('back');
    }
}

module.exports.destroyFriendship = async function(req, res){

    let reqFriend = await User.findById(req.user.id);
    let resFriend = await User.findById(req.params.id);

    let index = reqFriend.friendships.indexOf(req.params.id)
    reqFriend.friendships.splice(index,1);
    reqFriend.save();
    
    index = resFriend.friendships.indexOf(req.user.id)
    resFriend.friendships.splice(index,1);
    resFriend.save();

    req.flash('success' , 'Friendship Deleted Successfully')
    return res.redirect('back');
}