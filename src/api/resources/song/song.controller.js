import Joi from 'joi';
import Song from './sing.model';
import { isNumber } from 'util';


export default {

    // Method for creating new song
    async create(req, res){
        try{        
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            album: Joi.string(),
            url: Joi.string().required(),
            rating: Joi.number()
               .integer()
               .min(0)
               .max(5)
               .optional(),
            genre: Joi.string().required()
        });
        const {value, error } = Joi.validate(req.body, schema);
        if( error && error.details ){
            return res.status(400).json(error);
        } 
        const song = await Song.create(Object.assign({},value, {artist: req.user._id}));
        return res.json(song);
        } 
        catch (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    },

    // Method for getting all songs from collection
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
            const allSongs = await Song.paginate({}, options);
            return res.json(allSongs);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    // Method for getting one song from collection
    async getOne(req, res) {
        try {
            // 
            const { id } = req.params;
            const song = await Song.findById({_id: id});
            // if(!isNumber(id)){
            //     return res.status(404).json({ err: `make sure id:${id} is a number` }); 
            // }
            if(!song){
                return res.status(404).json({err:`could not find song with id:${id}`});
            }
            return res.json(song)
            // .populate('artist', 'firstName lastName');
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    // Method for getting one song from collection
    async deleteOne(req, res) {
        try {
            // 
            const { id } = req.params;
            const song = await Song.findByIdAndRemove({ _id: id });
            // if(!isNumber(id)){
            //     return res.status(404).json({ err: `make sure id:${id} is a number` }); 
            // }
            if (!song) {
                return res.status(404).json({ err: `could not find song with id:${id}` });
            }
            return res.json({success:`song deleted successfully`});
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    // Method for getting one song from collection
    async updateOne(req, res) {
        try {
            // 
            const { id } = req.params;
            const schema = Joi.object().keys({
                title: Joi.string().required(),
                album: Joi.string(),
                url: Joi.string().required(),
                rating: Joi.number()
                    .integer()
                    .min(0)
                    .max(5)
                    .optional(),
                genre: Joi.string().required()
            });
            const { value, error } = Joi.validate(req.body, schema);
            if (error && error.details) {
                return res.status(400).json(error);
            } 

            const song = await Song.findByIdAndUpdate({ _id: id }, value, {new: true});
            
            if (!song) {
                return res.status(404).json({ err: `could not find song with id:${id}` });
            }
            return res.json({ song, success: `song updated successfully` });
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    }
}