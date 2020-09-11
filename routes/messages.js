const express = require('express');
const passport = require('passport');

const router = express.Router();
const messagesController = require('../controllers/messages_controller');

router.get('/allchats',passport.checkAuthentication,messagesController.userChats);
router.get('/chatroom', passport.checkAuthentication, messagesController.chatRoom);

module.exports = router;