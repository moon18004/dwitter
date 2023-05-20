import express from 'express';

import tweetsRouter from './tweets.js';
import authRouter from './auth.js';
import swaggerRoute from './swagger.js';

const routes = express.Router();

routes.use('/', swaggerRoute);
routes.use('/tweets', tweetsRouter);
routes.use('/auth', authRouter);

export default routes;