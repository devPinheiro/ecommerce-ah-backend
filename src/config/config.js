const config = {
  production: {  
    secret: process.env.secret,
    MONGO_URI: process.env.MONGO_URI,
    port: process.env.PORT,
},
 development: {
    secret: "I_AME_GERER",
   MONGO_URI: 'mongodb://p_sam40:samuel40@ds145093.mlab.com:45093/music-api',
    port: 3000
 }
};

export const getConfig = env => config[env] || config.development;