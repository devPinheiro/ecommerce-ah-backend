import Joi from 'joi';

export default {
    validateCategory(body) {
        const schema = Joi.object().keys({
            products: Joi.array().items().required(),
            name: Joi.string().required()     
        });

        const {value, error} = Joi.validate(body, schema);
        if(error && error.details)
            return { error };
              
        return { value };
    }
};