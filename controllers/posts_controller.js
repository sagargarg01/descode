const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
const User = require('../models/user');

module.exports.create = async function(req, res){

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });


        if(req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created!'
            });
        }

        req.flash('success', 'Post created successfully');
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err);
          // added this to view the error on console as well
          console.log(err);
        return res.redirect('back');
    }

}

module.exports.uploadImage = async function(req, res){
    
    
    try {
        await Post.uploadedImage(req, res, async function(err){
            console.log(req.file);
            console.log(req.body);
            if(err){ console.log('***Multer error', err); return;}

            let post = await Post.create({
                user: req.user._id,
                image: Post.imagePath + '/' + req.file.filename
            });
            req.flash('success', 'Post created successfully');
            return res.redirect('back');
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}


module.exports.destroy = async function(req, res){

    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {

             // CHANGE :: delete the associated likes for the post and all its comments' likes too
             await Like.deleteMany({likeable: post});
             
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            if(req.xhr){

                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });
            }

            req.flash('success', 'Post deleted successfully');
            return res.redirect('back');

        } else {
            req.flash('error', 'Not Authorized to delete');
            return res.redirect('back');
        }

    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }


}