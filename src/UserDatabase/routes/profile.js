const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const {ensureAuthenticated} = require('../config/auth');
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId


const Tweet = require("../database_models/tweet_model");
const User = require("../database_models/user_model");



module.exports = router;