import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';
import createJwtToken from './jwtGenerator.js';


// Make it secure!
const jwtSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup (req, res, next) {
  // console.log(req);
  // console.log(req.body);
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  // console.log('123');
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res){
  const {username, password} = req.body;
  const user = await userRepository.findByUsername(username);
  if(!user){
    return res.status(401).json({message: 'Invalid user or password'});
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if(!isValidPassword){
    return res.status(401).json({message: 'Invalid user or password'});
  }

  const token = createJwtToken(user.id);
  res.status(200).json({token, username});
}

// function createJwtToken(id){
//   // console.log('line 47, controller auth.js', config.jwt.secretKey);
//   return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
// }

export async function me(req, res, next) {
  // console.log(asdf);
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
