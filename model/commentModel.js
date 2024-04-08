const mongoose = require('mongoose');

//tag 评论Model结构
const CommentSchema = new mongoose.Schema({
    commentId: String,
    name: String,
    txt: String,
});

module.exports = mongoose.model('Comment', CommentSchema);