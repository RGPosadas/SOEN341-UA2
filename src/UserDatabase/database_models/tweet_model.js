const mongoose = require("mongoose");
const shortid = require("shortid");

// Creating a userSchema
var tweetSchema = mongoose.Schema({
  tweet: String,
  tweet_id: {type: String, default: shortid.generate},
  likes: Number
});


//create the user model
const Tweet = mongoose.model('Tweet', tweetSchema);


//to use this User model, using module.export
module.exports = Tweet;
