import userService from './user.service';
import User from './user.model';
import jwt from '../../helpers/jwt';

export default {
   async signup(req, res) {
        try {
            const { value, error } = userService.validateSignup(req.body);
            if (error) {
                return res.status(400).json(error);
            }

            const encryptedPass = userService.encryptPassword(value.password);
            
            const result = await User.create({
               
                firstName: value.firstName,
                lastName: value.lastName,
                email: value.email,
                password: encryptedPass,
                role: value.role 

            });
            return res.status(201).json({ success: true });
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
       
    },
    async login(req, res) {
        try {
            
            const { value, error } = userService.validateLogin(req.body);
            if (error) {
                return res.status(400).json(error);
            }

            const user = await User.findOne({email: value.email});

            if(!user){
                return res.status(404).json({err: "user not found"});
            }

            const authenticated = userService.comparePass(value.password, user.password);

            if(!authenticated){
                return res.status(401).json({ err: "unauthorized" });
            }
            const token = jwt.issue({id:user._id}, '1d');
            return res.status(200).json({token}); // send jwt token
            
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }

    },
    authenticate(req, res){
        return res.json(req.user);
    }
    ,
    async getAll(req, res) {
        try {
            // fetch all users
            const value = await User.find()
            .populate('user');
           
            return res.json(value);
        } catch(err) {
          console.error(err);
          return res.status(500).json(error);
        }
    }
}