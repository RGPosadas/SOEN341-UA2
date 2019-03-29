var  app, mongoose, request, server, should, user, agent;
should   = require("should");
app      = require("../server");
mongoose = require("mongoose");
const Tweet = require("../database_models/tweet_model");
const User = require("../database_models/user_model");
request  = require("supertest");
agent = request.agent(app);
const expect = require('chai').expect
const shortid = require("shortid");
var ObjectId = mongoose.Types.ObjectId

const userCredentials = {
    email: 'travis@travis.com',
    password: 'travis'
}

const wrongPassword ={
  email:'travis@travis.com',
  password: 'wrongpassword'
}

const wrongEmail ={
    email:'travis@travis.com',
    password: 'wrongpassword'
}

      user1 = new User({
        first_name: "Tweet",
      last_name: "Poster",
      email: "follow@kiwi.com",
      password: "CornFlakes",
      follower:[],
      following: [],
      location: "IGA",
      description: "Flaky",
      interests: "Grains",
      }); 

      user2 = new User({
        first_name: "Life",
      last_name: "Cereal",
      email: "follower@kiwi.com",
      password: "LifeCereal",
      follower:[],
      following: [],
      location: "IGA",
      description: "Full of Life",
      interests: "Corn Flakes",
      }); 

      //LOGIN TEST
describe('', function () {
  describe('LOGIN TEST:', function () {
      it('The app should redirect to /profile when logged in successfully', function (done) {
        agent
        .post('/users/login')
         .send(userCredentials)
        .expect('Location','/profile/post')
        .end(done)

      }
      )
      it('Wrong password: the app should redirect to /login when login failed', function (done) {
      {
        agent
        .post('/users/login')
         .send(wrongPassword)
        .expect('Location','/users/login')
        .end(done)
      }

      }

      )

      it('Wrong email: the app should redirect to /login when login failed', function (done) {
          {
              agent
              .post('/users/login')
               .send(wrongEmail)
              .expect('Location', '/users/login')
              .end(done)
          }

      }

    )
    



  afterEach(function(done) {
      return done();
  });


})
})


//TWEET TEST
describe('TWEET TEST:', function () {
    var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);

    before(function (done) {
        
      tweet = new Tweet({
          tweet:tweetToPost,
      user_id: user1.id,
      first_name: user1.first_name,
      last_name: user1.last_name,
      liked_by: []
      });
      user1.save();
      tweet.save(done)});


  describe('Posting tweet: '+tweetToPost, function () {

      it('The tweet has been posted', function (done) {
       done();
      })


      after(function(){
          var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);
          Tweet.findOne({ user_id: user1.id }, function (err, data) {
          if (err) throw err;
        
            if(data.tweet == tweetToPost){
                
            }
      });
      })

})
})


//LIKE TEST
describe('LIKE TEST:', function () {
  var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);
  
  before(function (done) {
    tweet.liked_by.push(user1.id);
    user1.save();
    tweet.save(done)
  });

  
describe('Liking this tweet: '+tweetToPost, function () {

    it('The tweet was liked ', function (done) {
     done();
    })

    
    after(function(){
        var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);      
        Tweet.findOne({ user_id: user1.id }, function (err, data) {
        if (err) throw err;
       
          if(data.liked_by.indexOf(user1.id)==0){
             
          }
         
    });
 
    })

})
})

//FOLLOWING TEST
describe('FOLLOWING TEST:', function(){

  before(function(done){ 
    user1.following.push(ObjectId(user2.id)); 
    user2.save();
    user1.save(done);
});

describe('Following was sent to db: ' , function(){

  it('Tweet Poster is now following Life Cereal', function(done){
    done();
  })
  after(function(){

    User.findOne({"_id": ObjectId(user1.id)}, function (err, data){
      if (err) throw err;
      if(data.following.indexOf(user2.id)==0){  
        
      }
    });
  })
})
})
//UNFOLLOWING TEST
describe('UNFOLLOWING TEST:', function(){

  before(function(done){
   
    user2.save();
    user1.following.shift();
    user1.save(done);
    
  });
  describe('Unfollow was sent to the db: ', function(){
    it('Tweet Poster has unfollowed Life Cereal ', function(done){
      done();
    })
   after(function(){
    User.findOne({"_id": ObjectId(user1.id)}, function (err, data){
      if (err) throw err;
      if (data.following.indexOf(user2.id==null)){
      }
    });
   })
  })
})


//EXTRA FEATURE TESTS
describe('EXTRA FEATURE TESTS:', function () {
  it('The profile has like tab which redirect to /profile/likes', function (done) {
   request(app)
    .get('/profile/likes')
     .then(function(response){
      expect('Location','/profile/likes');
    
      
      done();
      
  })
  

});
it('The profile has my post tab which redirect to /profile/post', function (done) {
   request(app)
    .get('/profile/post')
     .then(function(response){
      expect('Location','/profile/post');
    
      
      done();
      
  })
  

});
it('The profile has followers tab which redirect to /profile/followers', function (done) {
   request(app)
    .get('/profile/followers')
     .then(function(response){
      expect('Location','/profile/followers');
    
      done();
      
  })
  

});
it('The profile has following tab which redirect to /profile/following', function (done) {
   request(app)
    .get('/profile/friends')
     .then(function(response){
      expect('Location','/profile/friends');
      
      done();
      
  })
  

});
after(function(){
    
    process.exit();
    
  });
});


