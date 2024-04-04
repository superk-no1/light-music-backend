const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    songId: String,
    title: String,
    album: String,
    albumId: Number,
    artist: String,
    duration: String,
    data: String,
    uri: String,
    likeCount: {
        type: Number,
        default: 0
    },
    listenCount: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Song', SongSchema);