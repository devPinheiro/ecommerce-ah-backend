import express from 'express';
import { songRouter } from './resources/song';
import { userRouter } from './resources/user/user.router';
import { playListRouter } from './resources/playlist';

export const restRouter = express.Router();
// song route
restRouter.use('/songs', songRouter);
// user route
restRouter.use('/users', userRouter);
// playlist route
restRouter.use('/playlist', playListRouter);