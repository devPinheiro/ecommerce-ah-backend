import express from 'express';
import userController from './user.controller';
import passport from 'passport';
import { isAdmin } from '../../middleware/adminCheck';

export const userRouter = express.Router();
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);

userRouter.get('/auth', passport.authenticate('jwt', {session:false}), userController.authenticate);

userRouter.route('/all').
get([passport.authenticate('jwt', {session:false}), isAdmin] , userController.getAll);