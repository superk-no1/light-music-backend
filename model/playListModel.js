const mongoose = require('mongoose');

//tag 歌单Model结构（未使用）
const PlaylistSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: mongoose.Types.ObjectId,
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
});

module.exports = mongoose.model('Playlist', PlaylistSchema);