const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const {ensureAuthenticated} = require('../config/auth');


const Tweet = require("../database_models/tweet_model");


//Home page
router.get('/', function (req,res) {

    res.render('welcome');

});


//Profile Page
router.get('/profile',ensureAuthenticated, function (req,res) {

    Tweet.find({user_id: req.user.id}, function(err, data){
        if(err) throw err;
        //console.log(req.user);
        res.render('profile', {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
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

module.exports = router;