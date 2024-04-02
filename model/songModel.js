const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: String,
    album: String,
    albumId: String,
    artist: String,
    duration: String,
    data: String,
    uri: String,
    sourceUrl: String,
    likeCount: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Song', SongSchema);