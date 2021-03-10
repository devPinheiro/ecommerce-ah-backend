import express from 'express';
import passport from 'passport';

import categoryController  from './category.controller';

export const categoryRouter = express.Router();

categoryRouter.route('/')
    .post([passport.authenticate('jwt', { session: false })], categoryController.create)
    .get(categoryController.findAll);