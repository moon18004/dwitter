import jwt from 'jsonwebtoken';
import { config } from '../config.js';

// Make it secure!
const jwtSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

function createJwtToken(id){
  // console.log('line 47, controller auth.js', config.jwt.secretKey);
  return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}

export default createJwtToken;