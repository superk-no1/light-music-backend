const express = require('express');
const songRouter = express.Router();
const songController = require('../controller/songController');

songRouter.get('/all', songController.getAllSong);
songRouter.post('/add', songController.addSong);
songRouter.get('/like/:id', songController.likeSong);
songRouter.get('/unlike/:id', songController.unLikeSong);
songRouter.get('/suggest', songController.getSuggestSongs);
songRouter.get('/:id', songController.getSong);

module.exports = songRouter;