const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const User = require("../database_models/user_model");

module.exports = function(passport){
    passport.use(
        new LocalStrategy( { usernameField: 'email'}, (email, password, done) => {
            //Find email
            User.findOne({ email: email})
                .then(user => {
                    if(!user){
                        return done(null, false, { message: 'Email is not registered.'});
                    }

                    //Match the password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        }
                        else{
                            return done(null, false, {message: 'Invalid password.'})
                        }
                    });

                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

};