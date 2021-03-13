import express from 'express';
import UserController from './UserController';

const userRouter = express.Router();

userRouter.post('/user', UserController.create);
userRouter.get('/user/:id', UserController.readOne);
userRouter.put('/user/:id', UserController.update);
userRouter.post('/user/login', UserController.login);

export = userRouter;