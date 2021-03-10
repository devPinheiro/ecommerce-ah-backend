import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
 
const { Schema } = mongoose;
const productSchema = new Schema({
     name: {
         type: String,
         required: [true, 'product must have a title']
     },
     image: {
         type: String,
     },
     price: {
         type: Number,
     },
     rating: {
         type: Number,
         default: 0,
         min: 0,
         max: 5
     },
     shortDescription: {
         type: String,
     },
     categoryId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Category',    
     },
     category: {
         type: String,   
     },
      manufacturer: {
         type: String,
     }
});

productSchema.plugin(mongoosePaginate);
export default mongoose.model('Product', productSchema);