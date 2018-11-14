import express from 'express';
import logger from 'morgan';
import swagger from 'swagger-ui-express';
import passport from 'passport';
import SwaggerDocument from './config/swagger.json';
import { connect } from './config/db';
import { restRouter } from './api';
import { configJWTStrategy } from './api/middleware/password-jwt';

const app = express();
const PORT = process.env.PORT || 3100;

connect();
app.use(logger('dev'));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize()); //req user
configJWTStrategy();

// api endpoints
app.use('/api', restRouter);

// swagger api docs endpoint
app.use('/api-docs', swagger.serve, swagger.setup(SwaggerDocument, {explorer: true}));

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});

// export app for testing
export default app
