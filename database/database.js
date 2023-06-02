import MongoDb from 'mongodb';
import Mongoose from 'mongoose';
import { config } from '../config.js';



export async function connectDB() {
  // return MongoDb.MongoClient.connect(config.db.host) //
  //   .then((client) => db = client.db());

  return Mongoose.connect(config.db.host, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
}
// TODO(Moon) : Delete below

let db;
export function getUsers(){
  return db.collection('users');
}
export function getTweets(){
  return db.collection('tweets');
}
