var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const express = require('express');
const router = express.Router();

//Bring in models
const Tweet = require("../database_models/tweet_model");
const User = require("../database_models/user_model");

// //Middleware
// const isLoggedIn = (req, res, next) => {
//     if(req.isAuthenticated()) {
//         return next();
//     }
//     req.flash("error",  "You need to be logged in to do that!");
//     res.redirect("/user/")
// }

// //Home Page
// router.get("/", )

router.get('/', function(req, res){
    //find the data in the database
    Tweet.find({}, function(err, data){
        if(err) throw err;
        res.render('profile', {tweets: data});
    });
});

router.post('/', urlencodedParser, function(req, res){
    
        //create it
        Tweet.create({
            tweet: req.body.item,
            
        });
        //sends it to the profile.ejs
        res.json(req.body.item);

    console.log("creating tweet");

});

module.exports = router;