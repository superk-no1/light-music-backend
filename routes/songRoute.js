const express = require('express');
const songRouter = express.Router();
const songController = require('../controller/songController');
const verify = require('../common/jwtHandle')

songRouter.get('/all', verify, songController.getAllSong);
songRouter.post('/add', verify, songController.addSong);
songRouter.get('/like/:id', verify, songController.likeSong);
songRouter.get('/unlike/:id', verify, songController.unLikeSong);
songRouter.get('/suggest', verify, songController.getSuggestSongs);
songRouter.get('/:id', verify, songController.getSong);

module.exports = songRouter;