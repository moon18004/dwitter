import express from 'express';
import pkg from 'express-openid-connect';
const { requiresAuth, auth } = pkg;
// import { requiresAuth, auth } from 'express-openid-connect';


import tweetsRouter from './tweets.js';
import authRouter from './auth.js';
import swaggerRoute from './swagger.js';
import * as oauth from '../controller/oauth.js';

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://dwitter.onrender.com',
  clientID: 'Uae9B7hR9vBvbiAn6oXJy9I3bSvJcZpp',
  issuerBaseURL: 'https://dev-r1j351qlttd53v8o.us.auth0.com'
};

const routes = express.Router();

routes.use(auth(config));
routes.get('/', (req, res, next) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  next();
}, oauth.signup);
routes.get('/profile', requiresAuth(), oauth.signup, 
  // (req, res) => { res.send(JSON.stringify(req.oidc.user));  }
);

routes.use('/', swaggerRoute);
routes.use('/tweets', tweetsRouter);
routes.use('/auth', authRouter);

export default routes;