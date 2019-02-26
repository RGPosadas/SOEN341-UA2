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
        //console.log(req.user);
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
        user_id: req.user.id
    });
    //sends it to the profile.ejs
    res.json(req.body.item);

    console.log("creating tweet");

});

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

router.post('/suggested',  urlencodedParser, function(req, res){

    User.updateOne({_id: req.user.id}, { $push: { "following": req.body.id } }, function (err, data) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(req.body.id + " Added followee to database"); 
        }
    })
});

router.get('/friends', ensureAuthenticated, function (req,res) {

    User.find({_id: req.user.following}, function(err, data){
        if(err) {
            console.log(err);
        }
        console.log(data);
        res.render('friends', {
            users: data
        })
    });
});

router.get('/feed',ensureAuthenticated, function (req,res) {

    var data;
    Tweet.find({user_id: req.user.following}, function(err, data){
        if(err) throw err;
        //console.log(req.user);
        console.log(data);
        res.render('feed', {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            location: req.user.location,
            description: req.user.description,
            interests: req.user.interests,
            tweets: data
        });
    });

});

module.exports = router;