// abcd1234

import { getUsers, useVirtualId } from '../database/database.js';
import MongoDb from 'mongodb';
import Mongoose from 'mongoose';

const ObjectId = MongoDb.ObjectId;

const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});
const oauthSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  picture: String,
});

useVirtualId(userSchema);
useVirtualId(oauthSchema);

const User = Mongoose.model('User', userSchema);
const Oauth = Mongoose.model('Oauth', oauthSchema);

export async function createOauth(user){
  return new Oauth(user).save().then((data)=>data.id);
}

export async function findByUsername(username) {
  return User.findOne({ username });
}

export async function getOauthId(nickname){
  return Oauth.findOne({nickname});
}

export async function createUser(user) {
  
  return new User(user).save().then((data) => data.id);
  
}

export async function findOauthById(id){
  return Oauth.findById(id);
}

export async function findById(id) {
  return User.findById(id);
  
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
