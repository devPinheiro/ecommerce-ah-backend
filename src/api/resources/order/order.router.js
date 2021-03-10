import express from 'express';
import passport from 'passport';
import orderController from './order.controller';
import { isAdmin } from '../../middleware/adminCheck';

export const orderRouter = express.Router();
// authenticated users can view all orders
// only an artist can create, update and delete orders
// admin can manage user management

//grouped middleware
const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin]
orderRouter.route('/')
.post(adminPolicy, orderController.create)
.get(passport.authenticate('jwt',{session: false}),orderController.getAll);

orderRouter.route('/:id')
.get(passport.authenticate('jwt',{session: false}),orderController.getOne)
    .delete(adminPolicy, orderController.deleteOne)
    .put(adminPolicy, orderController.updateOne);