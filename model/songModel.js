const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: String,
    artist: String,
    sourceUrl: String,
    likeCount: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Song', SongSchema);