const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.toggleLike = async function(req, res){
    try{

        // likes/toggle/?id=abcdef
        let likeable;
        let deleted = false;

        likeable = await Post.findById(req.query.id).populate('likes');
        

        // check if the like is already there
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            user: req.user._id
        })

        // if a like already exist -> delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;
        }else{
            // else make a new like
            let newLike = await Like.create({
                likeable: req.query.id,
                user: req.user._id
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200, {
            message: "Request successful!",
            data: {
                post: likeable,
                deleted: deleted,
                user: req.user._id
            }
        })

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
}