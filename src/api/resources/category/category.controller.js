import categoryService from "./category.service";
import Category from './category.model';

export default {
    async create(req, res) {
        try {
           // Use JOI validate
           const {value, error} = categoryService.validateCategory(req.body);
           if(error){
               return res.json(error);
           }
           const ProductCategory = await Category.create(Object.assign({}, value, { user: req.user._id}));
           return res.json(ProductCategory);
        } catch(err){
            console.error(err);
            return res.status(500).send(err); 
        }
    },
    async findAll(req, res) {
        try {
           const categories = await Product.find()
           .populate('products')
           .populate('user', 'name price');

           return res.json(categories);

        } catch(err) {
            console.error(err);
            return res.status(500).json(error);
        }
    }
}