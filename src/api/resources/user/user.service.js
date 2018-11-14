import Joi from 'joi';
import bcrypt from 'bcryptjs';

export default {
    comparePass(plainText, encryptPassword){
        return bcrypt.compareSync(plainText, encryptPassword);
    },

    validateLogin(body){
        const schema = Joi.object().keys({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string().required(),
        });

        const { value, error } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },

    encryptPassword(plainText){
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainText, salt);
    },

    validateSignup(body){
        const schema = Joi.object().keys({
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string()
                  .email()
                  .required(),  
          password: Joi.string().required(),
          role: Joi.number().integer(),
        });
        const {value, error} = Joi.validate(body, schema);
        if(error && error.details){
            return { error };
        }
        return {value};
    },
};