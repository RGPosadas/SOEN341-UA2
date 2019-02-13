const mongoose = require("mongoose");
const shortid = require("shortid");


//Mongoose is a JavaScript library that allows you to define schemas with strongly typed data.
// For more information, please visit this link: "https://code.tutsplus.com/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527"

// Creating a userSchema
var userSchema = mongoose.Schema({
  first_name: {type: String},
  last_name: {type: String},
  email: {type: String},
  password: {type: String},
  member_id: {type: String, default: shortid.generate},
  // followers: [{"member_id": String, "friend_name": String, "profile_pic": String}],
  // following
  location: {type: String, default: "None"},
  description: {type: String, default: "None"},
  interests: {type:String, default: "None"},
  profile_pic: {type: String, default: "default_profile.png"}
  //add post array
});




//create the user model
const User = mongoose.model('User', userSchema);
// Testing value to see if it appears on Collections of DB
// User.create({
//   name: "John",
// });

//to use this User model, using module.export
module.exports = User;
