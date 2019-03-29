const mongoose = require("mongoose");
const shortid = require("shortid");

// Creating a userSchema
var userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  member_id: {type: String, default: shortid.generate},
  followers: [String],
  following: [mongoose.Schema.Types.ObjectId],
  location: String,
  description: String,
  interests: String,
});

//create the user model
const User = mongoose.model('User', userSchema);

//to use this User model, using module.export
module.exports = User; 
