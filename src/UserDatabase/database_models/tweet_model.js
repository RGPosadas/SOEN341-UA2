const mongoose = require("mongoose");
const shortid = require("shortid");

var userSchema = require('mongoose').model('User').schema;

// Creating a userSchema
var tweetSchema = mongoose.Schema({
  tweet: String,
  user_id: String,
  first_name: String,
  last_name: String
  
});

//create the user model
const Tweet = mongoose.model('Tweet', tweetSchema);


//to use this User model, using module.export
module.exports = Tweet;

