const express = require('express');
const passport = require('passport');
const router = express.Router();
const searchController = require('../controllers/search_controller');

router.get('/user',passport.checkAuthentication, searchController.searchUser);

module.exports = router;