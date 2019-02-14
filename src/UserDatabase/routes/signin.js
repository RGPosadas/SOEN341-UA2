const express = require('express');
const router = express.Router();

//Bring in models
const User = require("../database_models/user_model");
const Tweet = require("../database_models/tweet_model");

//post method to process the Sign in click
// "/signin"
router.post("/", function (req, res) {

    //retrieve the email and password
    var email = req.body.email;
    var password = req.body.password;
    var user_profile;

    console.log(email + " " + password);

    //query the db to search for a matching document. There should be a unique document for an email.
    User.find({email: email}, function(err, data){

        console.log(data);
        //Need to add error handling
        if(err){
            console.log("Error occured " + err);
        }

        //if there is a match
        if(data.length > 0){
            //check that the password of the user matches the password inputted
            if(data[0].password.toString() == password) {
                console.log("matched password")
                //retrieve the user's profile
                user_profile = data;
            }
            else
                console.log("Invalid Password")
        }

        //There wasn't a match (no user in db with email entered).
        else {
            console.log("No record found, user must register")
        }

        //If the profile exists, go to the profile page when logging in
        if(user_profile){
            console.log("profile is renderring");

            //Once we link tweets with profiles, we need to query the tweets that belong to the profile logged in.
            Tweet.find({}, function(err, data){
                if(err) throw err;
                res.render('profile', {tweets: data});
            });
        }

        else{
            res.render("landing.ejs");
        }

    })

});

module.exports = router;