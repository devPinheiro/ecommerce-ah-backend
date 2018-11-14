import express from 'express';
import passport from 'passport';

import playListController  from './playlist.controller';

export const playListRouter = express.Router();

playListRouter.route('/')
    .post([passport.authenticate('jwt', { session: false })], playListController.create)
    .get([passport.authenticate('jwt', {session: false})], playListController.findAll);