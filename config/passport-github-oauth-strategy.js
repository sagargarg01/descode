const passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

passport.use(new GitHubStrategy({
   clientID: env.github_client_id,
   clientSecret: env.github_client_secret,
   callbackURL: env.github_call_back_url
 },
 function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

   User.findOne({email: profile.emails[0].value}).exec(function(err, user){
      if(err){console.log("Error in github strategy passport", err); return;}
      
     
       //if found, set the user as req.user
      if(user){
          return cb(null, user);
         
      }else{
           // if not found, create the user and set it as req.user
         //  console.log('***** new user lets create ')
          User.create({
              name: profile.name,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex'),
              verifyUser: true
          }, function(err, user){
              if(err){console.log("Error in creating user github strategy passport", err); return;}

              return cb(null, user);
          })
      }
  })
 }
));