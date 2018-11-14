import express from 'express';
import passport from 'passport';
import songController from './song.controller';
import { isArtist, isAdmin } from '../../middleware/is-artist';

export const songRouter = express.Router();
// authenticated users can view all songs
// only an artist can create, update and delete songs
// admin can manage user management

//grouped middleware
const artitstPolicy = [passport.authenticate('jwt', { session: false }), isArtist]
songRouter.route('/')
.post(artitstPolicy, songController.create)
.get(passport.authenticate('jwt',{session: false}),songController.getAll);

songRouter.route('/:id')
.get(passport.authenticate('jwt',{session: false}),songController.getOne)
    .delete(artitstPolicy, songController.deleteOne)
    .put(artitstPolicy, songController.updateOne);