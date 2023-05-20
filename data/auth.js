// abcd1234
// let users = [
//   {
//     id: '1',
//     username: 'bob',
//     password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
//     name: 'Bob',
//     email: 'bob@gmail.com',
//     url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
//   },
//   {
//     id: '2',
//     username: 'ellie',
//     password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
//     name : 'Ellie',
//     email: 'ellie@gmail.com'
//   }
// ];

import { getUsers } from '../database/database.js';
import MongoDb from 'mongodb';

const ObjectId = MongoDb.ObjectId;

export async function findByUsername(username) {
  return getUsers()
    .findOne({ username })
    .then(mapOptionalUser);
  // return users.find((user) => user.username === username);
}
export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) => {
      console.log(data.insertedId.toString());
      return data.insertedId.toString();
    });
  // const created = {...user, id: Date.now().toString()};
  // users.push(created);
  // return created.id;
}
export async function findById(id) {
  return getUsers()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalUser);
}

function mapOptionalUser(user){
  return user? {...user, id: user._id.toString()}: user;
}