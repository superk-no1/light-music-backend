const PlayList = require('../model/playListModel');

exports.getAllPlayList = async (req, res) => {
    const playLists = await PlayList.find();
    res.json(playLists);
};

exports.getPlayList = async (req, res) => {
    const playList = await PlayList.findById(req.params.id);
    res.json(playList);
};

exports.addPlayList = async (req, res) => {
    const playList = new PlayList(req.body);
    await playList.save();
    res.json({ message: 'playList created!' });
};

exports.updatePlayList = async (req, res) => {
    await PlayList.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'playList updated!' });
};

exports.deletePlayList = async (req, res) => {
    await PlayList.findByIdAndDelete(req.params.id);
    res.json({ message: 'PlayList deleted!' });
};

exports.addMusic = async (req, res) => {
    const playList = await PlayList.findById(req.params.id);   
    playList.songs.push(req.body['id']);
    await playList.save();
    res.json({ message: 'Music add!' });
};

exports.removeMusic = async (req, res) => {
    const playList = await PlayList.findById(req.params.id);
    playList.songs.pull(req.body['id']);
    await playList.save();
    res.json({ message: 'Music remove!' });
};