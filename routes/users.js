const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersControllers = require('../controllers/users_controller');
const friendsController = require('../controllers/friendship_controller');

router.post('/verify_account',passport.checkAuthentication,usersControllers.verify_account);

router.get('/profile/:id', passport.checkAuthentication,usersControllers.profile);
router.post('/update/:id', passport.checkAuthentication,usersControllers.update);
router.get('/createfriendship/:id', passport.checkAuthentication,friendsController.createFriensdhip);
router.get('/destroyfriendship/:id', passport.checkAuthentication,friendsController.destroyFriendship);


router.get('/sign-up',usersControllers.signUp);
router.get('/sign-in',usersControllers.signIn);

router.post('/create',usersControllers.create);


//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersControllers.createSession);

router.get('/sign-out',usersControllers.destroySession);

router.get('/forgot_password',usersControllers.Forgotten_password);
router.post('/find-user',usersControllers.find_user);
router.post('/send-mail',usersControllers.send_mail);
router.get('/resetPassword',usersControllers.resetPassword);
router.post('/new_password',usersControllers.newPassword);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect : '/users/sign-in'} ), usersControllers.createSession);


router.get('/auth/github',passport.authenticate('github', {scope: ['profile', 'email']}));
router.get('/auth/github/callback', passport.authenticate('github', {failureRedirect : '/users/sign-in'} ), usersControllers.createSession);

module.exports = router;