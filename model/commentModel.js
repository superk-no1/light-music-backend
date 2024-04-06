const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    commentId: String,
    name: String,
    txt: String,
});

module.exports = mongoose.model('Comment', CommentSchema);