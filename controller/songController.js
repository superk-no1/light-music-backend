const Song = require('../model/songModel');

exports.getAllSong = async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
};

exports.getSong = async (req, res) => {
    const song = await Song.findById(req.params.id);
    res.json(song);
};

exports.addSong = async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.json({ message: 'Song created!' });
};

exports.deleteSong = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Song deleted!' });
};

exports.likeSong = async (req, res) => {
    const song = await Song.findById(req.params.id);
    song.likeCount++;
    const likedSong = await song.save();
    res.json(likedSong);
};

exports.unLikeSong = async (req, res) => {
    const song = await Song.findById(req.params.id);
    if (song.likeCount > 0) {
        song.likeCount--;
    }
    const likedSong = await song.save();
    res.json(likedSong);
};

exports.getSuggestSongs = async (req, res) => {
    const songs = await Song.find()
        .sort({ likeCount: -1 })
        .limit(10);
    res.json(songs);
};