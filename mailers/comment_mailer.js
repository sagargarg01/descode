const nodeMailer = require('../config/nodemailer');



//this is another way of exporting a method 
exports.newComment = (comment) => {
    let htmlString =nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from: 'DESCODE',
        to: comment.user.email,
        subject: 'New Comment Published!',
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