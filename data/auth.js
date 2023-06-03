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

useVirtualId(userSchema);

const User = Mongoose.model('User', userSchema);

export async function findByUsername(username) {
  return User.findOne({ username });
  
}
export async function createUser(user) {
  
  return new User(user).save().then((data) => data.id);
  
}
export async function findById(id) {
  return User.findById(id);
  
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
