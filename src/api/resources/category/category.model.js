import mongoose from "mongoose";

const { Schema } = mongoose;
const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category must have a title']
    },
    products: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Product',
       required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('Category', categorySchema);