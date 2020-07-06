const nodeMailer = require('../config/nodemailer');
const User = require('../models/user');
const verifyUser = require('../models/verifyUser');
const randomize = require('randomatic');

exports.sendOTP = async function(useremail) {

    let userinfo = await User.findOne({email: useremail});

   let OTP = randomize('0',4);

    let verification = await verifyUser.create({
        user : userinfo._id,
        OTP: OTP
    });

    let htmlString =nodeMailer.renderTemplate({OTP}, '/verification/verify_user.ejs')

    nodeMailer.transporter.sendMail({
        from: 'SOCIAL GARG',
        to: useremail,
        subject: 'Verify Your Email',
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