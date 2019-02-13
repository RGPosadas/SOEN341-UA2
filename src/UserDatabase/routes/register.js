const express = require('express');
const router = express.Router();

//Bring in models
const User = require("../database_models/user_model");

//render the register form (when the User clicks register now, it will redirect to register.ejs)
// "/register"
router.get('/', (req, res) => {
    res.render('register.ejs');
});

//post method to process the register form
router.post('/add', function (req, res) {

    //Need to add check in database if email is already registered before creating the user


    //Rules for validation
    //req.checkBody('first_name', 'First Name is required').notEmpty();

    //get errors
    // let errors = req.ValidationErrors();
    //
    // if(errors){
    //   res.render('register.ejs', {
    //     errors:errors
    //   });
    // }

    console.log("creating user");
    //Create user based on values in the form, and create a User profile and add it to the User
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
        description: req.body.description,
        interests: req.body.interests,
        profile_pic: req.body.profile_pic

    });

    console.log("user created");
    //Need to add confirmation message that a User has been successfully created.
    res.render("profile.ejs");
});

module.exports = router;