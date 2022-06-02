const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    tripIndex: {type: Number, required: false},
    postTitle: {type: String, required: false},
    postDate: {type: Date, required: false},
    postBody: {type: String, required: false},
    public: {type: Boolean, required: false}
});

const Post = mongoose.model("post-details", postSchema);

module.exports = Post;