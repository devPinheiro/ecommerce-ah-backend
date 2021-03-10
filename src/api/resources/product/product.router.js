import express from 'express';
import passport from 'passport';
import productController from './product.controller';
import { isAdmin } from '../../middleware/adminCheck';

export const productRouter = express.Router();
// authenticated users can view all products
// only an artist can create, update and delete products
// admin can manage user management

//grouped middleware
const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin]
productRouter.route('/')
.post(adminPolicy, productController.create)
.get(productController.getAll);

productRouter.route('/:id')
.get(passport.authenticate('jwt',{session: false}),productController.getOne)
    .delete(adminPolicy, productController.deleteOne)
    .put(adminPolicy, productController.updateOne);