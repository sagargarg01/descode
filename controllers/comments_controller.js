const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');

module.exports.create = async function (req, res) {

    try {

        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            // commentMailer.newComment(comment);

        //   let job = queue.create('emails', comment).save(function(err){
        //         if(err){
        //             console.log('error in sending to the queue', err);
        //             return;
        //         }

        //         console.log('job enqueued', job.id);
        //     });

            if (req.xhr) {
                // to populate certain field on a preloaded document, thats how its done
                comment = await comment.populate('user', 'name email avatar').execPopulate();

                return res.status(200).json({
                    data: {
                        comment: comment,
                        post: post
                    },
                    message: 'Comment Created!'
                });
            }


            req.flash('success', 'comment created Successfully');
            res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }

}

module.exports.destroy = async function (req, res) {

    try {

        let comment = await Comment.findById(req.params.id);

        let post = await Post.findById(comment.post);

        if (comment.user == req.user.id || req.user.id == post.user) {

            let postId = comment.post;
            comment.remove();

            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id,
                        post:post
                    },
                    message: "Comment Deleted"
                });
            }

            req.flash('success', 'comment deleted successfully');

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
