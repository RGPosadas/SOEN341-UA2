const mongoose = require("mongoose");
const shortid = require("shortid");

//Mongoose is a JavaScript library that allows you to define schemas with strongly typed data.
// For more information, please visit this link: "https://code.tutsplus.com/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527"

// Creating a userSchema
var userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  member_id: {type: String, default: shortid.generate},
  followers: [String],
  following: [String],
  location: String,
  description: String,
  interests: String,
  // tweet: [
  //   {
  //     type: mongoose.Schema.Type.ObjectId,
  //     ref: "tweet_model"
  //   }
  // ]
  // like: [
  //   {
  //     type: mongoose.Schema.Type.ObjectId,
  //     ref: "tweet_model"
  //   }
  // ]
  //profile_pic: {type: String, default: "default_profile.png"}
});


//create the user model
const User = mongoose.model('User', userSchema);

// Testing value to see if it appears on Collections of DB
//   User.create({
//     first_name: "John",
//   });

//to use this User model, using module.export
module.exports = User; 
