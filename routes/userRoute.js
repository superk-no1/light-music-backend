const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');
const verify = require('../common/jwtHandle')

//user account
userRouter.post('/register', userController.userRegister);
userRouter.post('/login', userController.userLogin);
userRouter.get('/me', verify, userController.getMeInfo);

//test
userRouter.get('/all', userController.getAllUser);
userRouter.get('/:id', userController.getUser);
userRouter.post('/add', userController.createUser);
userRouter.post('/update/:id', userController.updateUser);
userRouter.get('/delete/:id', userController.deleteUser);

module.exports = userRouter;