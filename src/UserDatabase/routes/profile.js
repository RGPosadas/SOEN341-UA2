const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const {ensureAuthenticated} = require('../config/auth');
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId


const Tweet = require("../database_models/tweet_model");
const User = require("../database_models/user_model");

//Profile Page
router.get('/post',ensureAuthenticated, function (req,res) {

    var data;
    Tweet.find({user_id: req.user.id}, function(err, data){
        if(err) throw err;
        res.render('profile/post', {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            location: req.user.location,
            description: req.user.description,
            interests: req.user.interests,
            tweets: data,
        });
      });

});

router.get('/likes',ensureAuthenticated, function (req,res) {

    Tweet.find({liked_by: req.user.id}, function(err, data){
        if(err) throw err;
        res.render('profile/likes', {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            location: req.user.location,
            description: req.user.description,
            interests: req.user.interests,
            likes: data,
        });
      });

});

//GET method to show list of friends
router.get('/friends', ensureAuthenticated, function (req,res) {

    User.find({_id: req.user.following}, function(err, data){
        if(err) {
            console.log(err);
        }
        res.render('profile/friends', {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            location: req.user.location,
            description: req.user.description,
            interests: req.user.interests,
            users: data
        })
    });
});

//GET method to show list of followers
router.get('/followers', ensureAuthenticated, function (req,res) {

    User.find({_id: req.user.followers}, function(err, data){
        if(err) {
            console.log(err);
        }
        res.render('profile/followers', {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            location: req.user.location,
            description: req.user.description,
            interests: req.user.interests,
            users: data
        })
    });
});

//Tweet Button
router.post('/post',  urlencodedParser, function(req, res){
    
    //create it
    Tweet.create({
        tweet: req.body.item,
        user_id: req.user.id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        liked_by: []
    });
    //sends it to the profile.ejs
    res.json(req.body.item);

    console.log("creating tweet");

});

module.exports = router;