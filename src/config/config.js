require('dotenv').config();

const config = {
  production: {  
    secret: process.env.secret,
    MONGO_URI: process.env.MONGO_URI,
    port: process.env.PORT,
},
 development: {
    secret: "SOME_RANDOM_SECRET",
    MONGO_URI: process.env.MONGO_URI,
    port: process.env.PORT
 }
};

export const getConfig = env => config[env] || config.development;
