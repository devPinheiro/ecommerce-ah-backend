import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
 
const { Schema } = mongoose;
const songSchema = new Schema({
     title: {
         type: String,
         required: [true, 'Song must have a title']
     },
     album: {
         type: String,
     },
     url: {
         type: String,
         required: [true, 'Song must have Url']
     },
     rating: {
         type: Number,
         default: 0,
         min: 0,
         max: 5
     },
     genre: {
         type: String,
         required: [true, 'Song must have a genre']
     },
     artist: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
     }
});

songSchema.plugin(mongoosePaginate);
export default mongoose.model('Song', songSchema);