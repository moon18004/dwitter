import * as userRepository from '../data/auth.js';
import { getTweets } from '../database/database.js';
import MongoDb from 'mongodb';
import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

const ObjectId = MongoDb.ObjectId;

const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll() {
  return Tweet.find().sort({createdAt: -1});
  // return getTweets() //
  //   .find()
  //   .sort({ createdAt: -1 })
  //   .toArray()
  //   .then(mapTweets);
}
export async function getAllByUsername(username) {
  return Tweet.find({username}).sort({createdAt: -1});
  // return getTweets() //
  //   .find({ username })
  //   .sort({ createdAt: -1 })
  //   .toArray()
  //   .then(mapTweets);
}
export async function getById(id) {
  return Tweet.findById(id);
  // return getTweets()
  //   .findOne({ _id: new ObjectId(id) })
  //   .then(mapOptionalTweet);
}

export async function create(text, userId) {
  const user = userRepository.findById(userId) || userRepository.findOauthById(userId);
  return new Tweet({
          text,
          userId,
          name: user.name,
          username: user.username,
        }).save();
  
  // return userRepository.findById(userId).then((user) =>
  //   new Tweet({
  //     text,
  //     userId,
  //     name: user.name,
  //     username: user.username,
  //   }).save()
  // );

  // const { name, username, url } = await userRepository.findById(userId);

  // const tweet = {
  //   text,
  //   createdAt: new Date(),
  //   userId,
  //   name,
  //   username,
  //   url,
  // };
  // // tweets = [tweet, ...tweets];
  // return getTweets()
  //   .insertOne(tweet)
  //   .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
}
export async function update(id, text) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}
export async function remove(id) {
  return Tweet.findByIdAndDelete(id);
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}
function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
