import express from 'express';
import { productRouter } from './resources/product';
import { userRouter } from './resources/user';
import { categoryRouter } from './resources/category';
import { orderRouter } from './resources/order';

export const restRouter = express.Router();
// product route
restRouter.use('/products', productRouter);
// user route
restRouter.use('/users', userRouter);
// category route
restRouter.use('/category', categoryRouter);
// order route
restRouter.use('/order', orderRouter);