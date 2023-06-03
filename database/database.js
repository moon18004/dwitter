import MongoDb from 'mongodb';
import Mongoose from 'mongoose';
import { config } from '../config.js';



export async function connectDB() {
  // return MongoDb.MongoClient.connect(config.db.host) //
  //   .then((client) => db = client.db());
  console.log(config.db.host);
  return Mongoose.connect(config.db.host);
}
export function useVirtualId(schema){
  schema.virtual('id').get(function () {
    return this._id.toString();
  })
  schema.set('toJSON', {virtuals:true});
  schema.set('toObject', {virtuals :true});
}

// TODO(Moon) : Delete below

let db;
export function getUsers(){
  return db.collection('users');
}
export function getTweets(){
  return db.collection('tweets');
}
