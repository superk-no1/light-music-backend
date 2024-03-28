const express = require('express');
const playListRouter = express.Router();
const playListController = require('../controller/playListController');
const verify = require('../common/jwtHandle')

playListRouter.get('/all', verify, playListController.getAllPlayList);
playListRouter.post('/add', verify, playListController.addPlayList);
playListRouter.post('/update/:id', verify, playListController.updatePlayList);
playListRouter.get('/:id', verify, playListController.getPlayList);
playListRouter.get('/delete/:id', verify, playListController.deletePlayList);
playListRouter.post('/addMusic/:id', verify, playListController.addMusic);
playListRouter.post('/removeMusic/:id', verify, playListController.removeMusic);

module.exports = playListRouter;