import playlistService from "./playlist.service";
import Playlist from './playlist.model';

export default {
    async create(req, res) {
        try {
           // Use JOI validate
           const {value, error} = playlistService.validatePlayList(req.body);
           if(error){
               return res.json(error);
           }
           const playList = await Playlist.create(Object.assign({}, value, { user: req.user._id}));
           return res.json(playList);
        } catch(err){
            console.error(err);
            return res.status(500).send(err); 
        }
    },
    async findAll(req, res) {
        try {
           const playlists = await Playlist.find()
           .populate('songs')
           .populate('user', 'firstName lastName');

           return res.json(playlists);

        } catch(err) {
            console.error(err);
            return res.status(500).json(error);
        }
    }
}