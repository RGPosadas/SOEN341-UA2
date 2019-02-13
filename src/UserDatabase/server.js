//The require() method is used to load and cache JavaScript modules.
// So, if you want to load a local, relative JavaScript module into a Node.js application, you can simply use the require() method.
var uri = 'mongodb+srv://admin:admin@tmcluster-1frve.mongodb.net/test?retryWrites=true';

//all the modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

// When you call mongoose.connect, it will set up a connection with the database.
//Connect to the database
mongoose.connect(uri, { useNewUrlParser: true });
let db = mongoose.connection;

//check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

//check for db errors
db.on('error', function(err){
  console.log(err)
});

//Bring in models
const User = require("./database_models/user_model");
const Tweet = require("./database_models/tweet_model");

const app = express();
//static files
app.use(express.static(path.join(__dirname, 'public')));
// set the view engine to ejs
app.set("view engine", "ejs");
//set the view path
app.set("views", path.join(__dirname, 'views'));

//bodyParser used for req.body
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// server
const server = require("http").Server(app);
//var io = require("socket.io")(server);
server.listen(3000);

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


//Route Files
let register = require('./routes/register');
app.use('/register', register);

let signin = require('./routes/signin');
app.use('/signin', signin);

let tweet = require('./routes/tweet');
tweet(app);


//routing
//A route method is derived from one of the HTTP methods, and is attached to an instance of the express class.
app.get('/', function (req, res) {
  // Returns the rendered HTML of a view via the callback function. It accepts an optional parameter that is an object containing
  //local variables for the view. It is like res.render(), except it cannot send the rendered view to the client on its own.
  res.render("landing.ejs")
});
