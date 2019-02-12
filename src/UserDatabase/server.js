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

//render the register form
app.get('/register', (req, res) => {
  res.render('register.ejs');
});

//post method to process the register form
app.post("/post-register", function (req, res) {
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,

  });
  res.render("landing.ejs");
});

app.post("/post-signin", function (req, res) {
  var email = req.body.email;
  var passwrd = req.body.password;
  var user;
  var err;
  User.findOne({email:email},function(err,user){
    if (err)
      alert("Hi");
    }
    callback(null, user)
  })
  res.render("profile.ejs");
});


