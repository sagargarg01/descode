const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new FacebookStrategy({
        clientID: "679550126178762",
        clientSecret: "ef6bca2e002a5e72b37bfdb2cc063e99",
        callbackURL: "http://localhost:8000/users/auth/facebook/callback",
    },

    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log("Error in facebook strategy passport", err); return;}
            
            console.log(accessToken);

             //if found, set the user as req.user
            if(user){
                return done(null, user);
               
            }else{
                 // if not found, create the user and set it as req.user
                console.log('***** new user lets create ')
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log("Error in creating user facebook strategy passport", err); return;}

                    return done(null, user);
                })
            }
        })
    }
    
))