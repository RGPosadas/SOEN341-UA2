const mongoose = require("mongoose");
const shortid = require("shortid");

var userSchema = require('mongoose').model('User').schema;

// Creating a userSchema
var tweetSchema = mongoose.Schema({
  tweet: String,
  // tweet_id: {type: String, default: shortid.generate},
  // tweet_by: [userSchema],
  // // likes: Number,
  // creator: [
  //   _id: {
  //     type: mongoose.Schema.Type.ObjectId,
  //     ref: "user_model"
  //   }
  // ]
});

//create the user model
const Tweet = mongoose.model('Tweet', tweetSchema);


//to use this User model, using module.export
module.exports = Tweet;

