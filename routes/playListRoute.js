const express = require('express');
const playListRouter = express.Router();
const playListController = require('../controller/playListController');

playListRouter.get('/all', playListController.getAllPlayList);
playListRouter.post('/add', playListController.addPlayList);
playListRouter.post('/update/:id', playListController.updatePlayList);
playListRouter.get('/:id', playListController.getPlayList);
playListRouter.get('/delete/:id', playListController.deletePlayList);
playListRouter.post('/addMusic/:id', playListController.addMusic);
playListRouter.post('/removeMusic/:id', playListController.removeMusic);

module.exports = playListRouter;