import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';
import createJwtToken from './jwtGenerator.js';

export async function signup (req, res, next) {
  const { nickname, name, email, picture } = req.oidc.user;
  const id = await userRepository.getOauthId(nickname);
  if(id){
    const token = createJwtToken(id);
    res.status(201).json({token, name});
  }
  else{
    const userId = await userRepository.createOauth({
      nickname, name, email, picture
    });
    const token = createJwtToken(userId);
    res.status(201).json({token, name});
  }
}