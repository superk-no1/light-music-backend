const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/all', userController.getAllUser);
router.get('/:id', userController.getUser);
router.post('/add', userController.createUser);
router.post('/update/:id', userController.updateUser);
router.get('/delete/:id', userController.deleteUser);

module.exports = router;