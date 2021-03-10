import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
 
const { Schema } = mongoose;
const orderSchema = new Schema({
     productId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product',
         required: true
     },
     customerId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
     },
     quantity: {
         type: Number,
     },
     totalPrice: {
         type: Number,
     },
     status: {
         type: String,
         default: 'pending',
     },
     orderDate: {
         type: String,
     }
});

orderSchema.plugin(mongoosePaginate);
export default mongoose.model('Order', orderSchema);