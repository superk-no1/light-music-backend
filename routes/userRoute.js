const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');

//user account
userRouter.get('/register', userController.userRegister);
userRouter.get('/login', userController.userLogin);

//test
userRouter.get('/all', userController.getAllUser);
userRouter.get('/:id', userController.getUser);
userRouter.post('/add', userController.createUser);
userRouter.post('/update/:id', userController.updateUser);
userRouter.get('/delete/:id', userController.deleteUser);

module.exports = userRouter;