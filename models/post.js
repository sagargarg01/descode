const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const IMAGE_PATH = path.join('/uploads/users/postimage');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    //include the aRRay of ids of all comments in this post Schema itself
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    image: {
        type: String
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', IMAGE_PATH));
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// static functions 
postSchema.statics.uploadedImage = multer({ storage: storage }).single('image');
postSchema.statics.imagePath = IMAGE_PATH;

const Post = mongoose.model('Post', postSchema);
module.exports = Post;