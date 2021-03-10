import Joi from 'joi';
import Order from './order.model';
import { isNumber } from 'util';


export default {

    // Method for creating new order
    async create(req, res){
        try{        
        const schema = Joi.object().keys({
                productId: Joi.number().required(),
                customerId: Joi.number().required()
        });
        const {value, error } = Joi.validate(req.body, schema);
        if( error && error.details ){
            return res.status(400).json(error);
        } 
        const order = await Order.create(Object.assign({},value, {user: req.user._id}));
        return res.json(order);
        } 
        catch (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    },

    // Method for getting all orders from collection
    async getAll(req, res) {
        try {
            // 
            const {page, perPage} = req.query;
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 10,
                populate: {
                    path: 'product',
                    select: 'name price category'
                }
            };
            const allorders = await Order.paginate({}, options);
            return res.json(allorders);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    // Method for getting one order from collection
    async getOne(req, res) {
        try {
            // 
            const { id } = req.params;
            const order = await Order.findById({_id: id});
           
            if(!order){
                return res.status(404).json({err:`could not find order with id:${id}`});
            }
            return res.json(order)
            
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    // Method for getting one order from collection
    async deleteOne(req, res) {
        try {
            // 
            const { id } = req.params;
            const order = await Order.findByIdAndRemove({ _id: id });
            // if(!isNumber(id)){
            //     return res.status(404).json({ err: `make sure id:${id} is a number` }); 
            // }
            if (!order) {
                return res.status(404).json({ err: `could not find order with id:${id}` });
            }
            return res.json({success:`order deleted successfully`});
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    // Method for getting one order from collection
    async updateOne(req, res) {
        try {
            // 
            const { id } = req.params;
            const schema = Joi.object().keys({
                 productId: Joi.number().required(),
                 customerId: Joi.number().required()
            });
            const { value, error } = Joi.validate(req.body, schema);
            if (error && error.details) {
                return res.status(400).json(error);
            } 

            const order = await Order.findByIdAndUpdate({ _id: id }, value, {new: true});
            
            if (!order) {
                return res.status(404).json({ err: `could not find order with id:${id}` });
            }
            return res.json({ order, success: `order updated successfully` });
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    }
}