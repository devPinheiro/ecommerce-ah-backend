import Joi from 'joi';
import Product from './product.model';
import { isNumber } from 'util';


export default {

    // Method for creating new product
    async create(req, res){
        try{        
        const schema = Joi.object().keys({
                name: Joi.string().required(),
                category: Joi.string(),
                shortDescription: Joi.string(),
                manufacturer: Joi.string(),
                rating: Joi.number()
                    .integer()
                    .min(0)
                    .max(5)
                    .optional(),
                price: Joi.number().required()
        });
        const {value, error } = Joi.validate(req.body, schema);
        if( error && error.details ){
            return res.status(400).json(error);
        } 
        const product = await Product.create(Object.assign({},value, {artist: req.user._id}));
        return res.json(product);
        } 
        catch (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    },

    // Method for getting all products from collection
    async getAll(req, res) {
        try {
            // 
            const {page, perPage} = req.query;
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 10,
                populate: {
                    path: 'artist',
                    select: 'firstName lastName'
                }
            };
            const allProducts = await Product.paginate({}, options);
            return res.json(allProducts);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    // Method for getting one product from collection
    async getOne(req, res) {
        try {
            // 
            const { id } = req.params;
            const product = await Product.findById({_id: id});
            // if(!isNumber(id)){
            //     return res.status(404).json({ err: `make sure id:${id} is a number` }); 
            // }
            if(!product){
                return res.status(404).json({err:`could not find product with id:${id}`});
            }
            return res.json(product)
            // .populate('artist', 'firstName lastName');
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    // Method for getting one product from collection
    async deleteOne(req, res) {
        try {
            // 
            const { id } = req.params;
            const product = await Product.findByIdAndRemove({ _id: id });
            // if(!isNumber(id)){
            //     return res.status(404).json({ err: `make sure id:${id} is a number` }); 
            // }
            if (!product) {
                return res.status(404).json({ err: `could not find product with id:${id}` });
            }
            return res.json({success:`product deleted successfully`});
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    // Method for getting one product from collection
    async updateOne(req, res) {
        try {
            // 
            const { id } = req.params;
            const schema = Joi.object().keys({
                name: Joi.string().required(),
                category: Joi.string(),
                shortDescription: Joi.string(),
                manufacturer: Joi.string(),
                rating: Joi.number()
                    .integer()
                    .min(0)
                    .max(5)
                    .optional(),
                price: Joi.number().required()
            });
            const { value, error } = Joi.validate(req.body, schema);
            if (error && error.details) {
                return res.status(400).json(error);
            } 

            const product = await Product.findByIdAndUpdate({ _id: id }, value, {new: true});
            
            if (!product) {
                return res.status(404).json({ err: `could not find product with id:${id}` });
            }
            return res.json({ product, success: `product updated successfully` });
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    }
}