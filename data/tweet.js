import * as userRepository from '../data/auth.js';
import { getTweets } from '../database/database.js';
import MongoDb from 'mongodb';

const ObjectId = MongoDb.ObjectId;

// let tweets = [
//   {
//     id: '1',
//     text: 'dreamcoding',
//     createdAt: Date.now().toString(),
//     userId: '1',
//   },
//   {
//     id: '2',
//     text: 'merong',
//     createdAt: Date.now().toString(),
//     userId: '1',
//   },
// ];

export async function getAll() {
  return getTweets() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}
export async function getAllByUsername(username) {
  return getTweets() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}
export async function getById(id) {
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);

  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name,
    username,
    url,
  };
  // tweets = [tweet, ...tweets];
  return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
}
export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text } },
      { returnDocument: 'after' }
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}
export async function remove(id) {
  return getTweets().deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}
function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
