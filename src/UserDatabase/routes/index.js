const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const {ensureAuthenticated} = require('../config/auth');


const Tweet = require("../database_models/tweet_model");
const User = require("../database_models/user_model");


//Home page
router.get('/', function (req,res) {

    res.render('welcome');

});


//Profile Page
router.get('/profile',ensureAuthenticated, function (req,res) {

    var data;
    Tweet.find({user_id: req.user.id}, function(err, data){
        if(err) throw err;
        res.render('profile', {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            location: req.user.location,
            description: req.user.description,
            interests: req.user.interests,
            tweets: data
        });
    });

});

//Tweet Button
router.post('/profile',  urlencodedParser, function(req, res){
    
    //create it
    Tweet.create({
        tweet: req.body.item,
        user_id: req.user.id,
        first_name: req.user.first_name,
        last_name: req.user.last_name
    });
    //sends it to the profile.ejs
    res.json(req.body.item);

    console.log("creating tweet");

});

//Display all users currently using the app as suggested users to follow
router.get('/suggested', ensureAuthenticated, function (req,res) {

    User.find({}, function(err, data){
        if(err) {
            console.log(err);
        }
        res.render('suggested', {
            users: data
        })
    });
});

//POST method for suggested to listen to form submit in Suggested Users page
router.post('/suggested',  urlencodedParser, function(req, res){

    //This will update current user's following array to add the user they clicked on
    User.updateOne({_id: req.user.id}, { $push: { "following": req.body.id } }, function (err, data) {
        if(err) {
            console.log(err);
        }
        else {
            //console.log(req.body.id + " Added follower to database"); 
        }
    })
});

//GET method to show list of friends
router.get('/friends', ensureAuthenticated, function (req,res) {

    User.find({_id: req.user.following}, function(err, data){
        if(err) {
            console.log(err);
        }
        res.render('friends', {
            users: data
        })
    });
});

//GET method to show feed only for users that are being followed
router.get('/feed',ensureAuthenticated, function (req,res) {

    Tweet.find({user_id: req.user.following}, function(err, data){
        if(err) throw err;
        res.render('feed', {
            tweets: data
        });
    });

});

module.exports = router;