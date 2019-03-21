const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')

const User = require("../database_models/user_model");

//Login Page
router.get('/login', function (req,res) {

    res.render("Login");

});

//Login Handler
router.post('/login', function(req,res, next){
    passport.authenticate('local', {
        successRedirect: '/profile/post',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);
});

//Register Page
router.get('/register', function (req,res) {

    res.render("Register");

});

//Register Handler
router.post('/register', function(req,res){

    const {first_name, last_name, email, password, password2, location, description, interests} = req.body;

    let errors = [];

    //Check for required fields
    if(!first_name || !last_name || !email || !password || !password2 || !location || !description || !interests){
        errors.push({ msg: "Please fill in all the fields!"});
    }

    //Check that the password match
    if(password !== password2){
        errors.push({ msg: "Passwords do not match!"});
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            first_name,
            last_name,
            email,
            password,
            password2,
            location,
            description,
            interests
        });
    } else {
        User.findOne({email: email})
            .then( user => {
                if(user){
                    //Email already exists
                    errors.push({msg: "Email already exists!"});
                    res.render('register', {
                        errors,
                        first_name,
                        last_name,
                        email,
                        password,
                        password2,
                        location,
                        description,
                        interests
                    });
                } else {
                    const newUser = new User({
                        first_name,
                        last_name,
                        email,
                        password,
                        location,
                        description,
                        interests,
                    });

                    //Encrypt password
                    bcrypt.genSalt(10, (err,salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;

                            newUser.save()
                                .then(user => {
                                    console.log(newUser);
                                    req.flash('success_msg', 'You have successfully registered.')
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        }))

                }
            });
    }

});

//Logout
router.get('/logout', function(req,res){
    req.logout();
    req.flash('success_msg', 'You have been logged out.');
    res.redirect('/users/login');
});


module.exports = router;