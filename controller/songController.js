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

exports.syncLocal = async (req, res) => {
    const songIds = req.body;
    if (songIds === null || songIds.length === 0) {
        res.status(500).send('can not be null')
    }
    const songPromises = songIds.map(songId => {
        return Song.create({
            songId: songId,
            title: "default_title",
            album: "default_album",
            albumId: 0,
            artist: "default_artist",
            duration: "default_duration",
            data: "default_data",
            uri: "default_uri",
            likeCount: 0,
            listenCount: 0
        });
    });
    Promise.all(songPromises)
        .then(results => {
            res.json(songPromises);
        })
        .catch(err => {
            res.status(500).send('failed');
        });
};

exports.deleteSong = async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: 'Song deleted!' });
};

exports.likeSong = async (req, res) => {
    let decodedToken = jwt.decode(req.headers['token'], {complete: true});
    let userId = decodedToken.payload.id;
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

exports.listenSong = async (req, res) => {
    let decodedToken = jwt.decode(req.headers['token'], {complete: true});
    let userId = decodedToken.payload.id;
    let songId = req.params.id;
    try {
        const song = await Song.findByIdAndUpdate(
            songId,
            { $inc: { listenCount: 1 } },
            { new: true }
        );
        if (!song) {
            return res.status(404).send('No song found.');
        }
        res.status(200).send(song);
    } catch (err) {
        return res.status(500).send(err);
    }
};

exports.getSuggestSongs = async (req, res) => {
    let songs = await Song.find().limit(10);
    songs.sort((a, b) => (3 * b.listenCount + 7 * b.likeCount) - (3 * a.listenCount + 7 * a.likeCount));
    const songIds = songs.map(song => song.songId);
    res.json(songIds);
};