const nodeMailer = require('../config/nodemailer');
const User = require('../models/user');
const password = require('../models/reset_password');
const crypto = require('crypto');

exports.passwordResetMail = async function(useremail) {

    let userinfo = await User.findOne({email: useremail});

    let accesstoken = crypto.randomBytes(20).toString('hex');

    let oneTimeAccess = await password.create({
        user : userinfo._id,
        accesstoken: accesstoken,
        isvalid: true
    });

   
    let invalid = setTimeout(makeTokenInvalid,600000);

    function makeTokenInvalid(){
        oneTimeAccess.isvalid = false;
        oneTimeAccess.save();
        console.log(oneTimeAccess)
    }

    let htmlString =nodeMailer.renderTemplate({oneTimeAccess}, '/password/resetPassword.ejs')

    nodeMailer.transporter.sendMail({
        from: 'SOCIAL GARG',
        to: useremail,
        subject: 'Change Your Password',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error in sending Email', err);
            return;
        }

        console.log('message sent', info);
        return;
    });

}