const express = require('express');
const songRouter = express.Router();
const songController = require('../controller/songController');
const verify = require('../common/jwtHandle')

songRouter.get('/all', verify, songController.getAllSong);
songRouter.post('/add', verify, songController.addSong);
songRouter.post('/upload', verify, songController.syncLocal);
songRouter.post('/comment', verify, songController.commentSong);
songRouter.post('/like', verify, songController.likeSong);
songRouter.post('/unlike', verify, songController.unLikeSong);
songRouter.get('/suggest', verify, songController.getSuggestSongs);
songRouter.post('/listen', verify, songController.listenSong);
songRouter.get('/:id', verify, songController.getSong);

module.exports = songRouter;