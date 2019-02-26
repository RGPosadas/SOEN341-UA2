const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const {ensureAuthenticated} = require('../config/auth');
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId


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

    if(req.user.following.length > 0){

        //map the following array of strings into a new array of object ids
        let objectIdArray = req.user.following.map(s => new ObjectId(s));
        //add current user to the array as well
        objectIdArray.push(req.user.id);

        //query everything not in objectIdArray which is the current user and who they are following
        User.find({ _id : { $nin: objectIdArray}}, function(err, data){
            if(err) {
                console.log(err);
            }
            res.render('suggested', {
                users: data
            })
        });
    }
    //user isn't following anyone yet, so just query everyone except the user itself
    else{
        User.find({ _id : { $nin: [req.user.id] }}, function(err, data){
            if(err) {
                console.log(err);
            }
            res.render('suggested', {
                users: data
            })
        });
    }

});

//POST method for suggested to listen to form submit in Suggested Users page
router.post('/suggested',  urlencodedParser, function(req, res){

    //This will update current user's following array to add the user they clicked on
    User.updateOne({_id: req.user.id}, { $push: { "following": req.body.id } }, function (err, data) {
        if(err) {
            console.log(err);
        }
        else {
            req.flash('success_msg', 'You are now following!');
            console.log(req.body.id + " Added to UserSchema following"); 
        }
    })
    
    //This will update the user that is followed and add the current user id to their database
    User.updateOne({_id: req.body.id}, { $push: { "followers": req.user.id } }, function (err, data) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(req.user.id + " Added to userSchema followers"); 
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

//GET method to show list of followers
router.get('/followers', ensureAuthenticated, function (req,res) {

    User.find({_id: req.user.followers}, function(err, data){
        if(err) {
            console.log(err);
        }
        res.render('followers', {
            users: data
        })
    });
});

module.exports = router;