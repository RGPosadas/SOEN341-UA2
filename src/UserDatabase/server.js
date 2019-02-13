//The require() method is used to load and cache JavaScript modules.
// So, if you want to load a local, relative JavaScript module into a Node.js application, you can simply use the require() method.


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// When you call mongoose.connect, it will set up a connection with the database.
const node_connect_db = mongoose.connect('mongodb://localhost:27017/myapp');

const User = require("./database_models/user_model");


const app = express();
app.use(express.static("./public"));
// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// server
const server = require("http").Server(app);
//var io = require("socket.io")(server);
server.listen(3000);

//routing
//A route method is derived from one of the HTTP methods, and is attached to an instance of the express class.
app.get('/', function (req, res) {
  // Returns the rendered HTML of a view via the callback function. It accepts an optional parameter that is an object containing
  //local variables for the view. It is like res.render(), except it cannot send the rendered view to the client on its own.
  res.render("landing.ejs")
});

//render the register form (when the User clicks register now, it will redirect to register.ejs)
app.get('/register', (req, res) => {
  res.render('register.ejs');
});

//post method to process the register form
app.post("/post-register", function (req, res) {

  //Need to add check in database if email is already registered before creating the user


  //Create user based on values in the form, and create a User profile and add it to the User
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    user_profile: User.create({
      location: req.body.location,
      description: req.body.description,
      interests: req.body.interests,
      profile_pic: req.body.profile_pic
    })

  });

  //Need to add confirmation message that a User has been successfully created.
  res.render("profile.ejs");
});


//post method to process the Sign in click
app.post("/post-signin", function (req, res) {

  //retrieve the email and password
  var email = req.body.email;
  var password = req.body.password;
  var user_profile;

  //query the db to search for a matching document. There should be a unique document for an email.
  User.find({email: email}, function(err, data){


    //Need to add error handling
  if(err){
    console.log("Error occured " + err);
  }

  //if there is a match
  if(data.length > 0){

    //check that the password of the user matches the password inputted
    if(data[0].password.toString() == password) {
      //retrieve the user's profile
      user_profile = data[0].user_profile;
    }
  }

  //There wasn't a match (no user in db with email entered).
  else {
      console.log("No record found, user must register")
  }

  //If the profile exists, go to the profile page when logging in
  if(user_profile){
    res.render("profile.ejs");
  }

  else{
    res.render("landing.ejs")
  }

})

});


