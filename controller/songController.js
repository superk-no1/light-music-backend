const jwt = require('jsonwebtoken');

const Song = require('../model/songModel');
const User = require('../model/userModel');

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
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: 'Song deleted!' });
};

exports.likeSong = async (req, res) => {
    let decodedToken = jwt.decode(req.headers['token'], {complete: true});
    let userId = decodedToken.payload.id;
    console.log(userId);
    let songId = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { favoriteSongs: songId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).send('No user found.');
        }
        // 用户更新成功后，增加歌曲的 likeCount
        const song = await Song.findByIdAndUpdate(
            songId,
            { $inc: { likeCount: 1 } },
            { new: true }
        );
        if (!song) {
            return res.status(404).send('No song found.');
        }
        res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
};

exports.unLikeSong = async (req, res) => {
    let decodedToken = jwt.decode(req.headers['token'], {complete: true});
    let userId = decodedToken.payload.id;
    console.log(userId);
    let songId = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { favoriteSongs: songId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).send('No user found.');
        }
        // 用户成功取消收藏后，减少歌曲的 likeCount
        const song = await Song.findByIdAndUpdate(
            songId,
            { $inc: { likeCount: -1 } },  // 使用 $inc 减小 likeCount 的值
            { new: true }
        );
        if (!song) {
            return res.status(404).send('No song found.');
        }
        res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
};

exports.getSuggestSongs = async (req, res) => {
    const songs = await Song.find()
        .sort({ likeCount: -1 })
        .limit(10);
    res.json(songs);
};