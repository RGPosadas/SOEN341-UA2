var  app, mongoose, request, server, should, user, agent;
should   = require("should");
app      = require("../server");
mongoose = require("mongoose");
const Tweet = require("../database_models/tweet_model");
const User = require("../database_models/user_model");
request  = require("supertest");
agent = request.agent(app);
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

describe('Login Test', function () {
  describe('Login test begins', function () {
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

  after(function () {
      console.log("    Login test ends");
  });

})
})



describe('Tweet Test:sending a tweet...', function () {
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


  describe('tweet sended to db:'+tweetToPost, function () {

      it('The tweet has been posted', function (done) {
       done();
      })


      after(function(){
          var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);
          Tweet.findOne({ user_id: user1.id }, function (err, data) {
          if (err) throw err;
          console.log("Query results: " + data);
            if(data.tweet == tweetToPost){
                console.log("Tweet successfully found in database");
            }
      });
      })

})
})
describe('Tweet Test:liking a tweet...', function () {
  var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);
  
  before(function (done) {  
describe('like sended to db:'+tweetToPost, function () {

    it('The tweet was liked by travis', function (done) {
     done();
    })

    
    after(function(){
        var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);      
        Tweet.findOne({ user_id: user1.id }, function (err, data) {
        if (err) throw err;
        console.log("Query results: " + data);
          if(data.liked_by.indexOf(user1.id)==0){
              console.log("Liked successfully");
          }
         
    });
 
    })

})
})

describe('Tweet Test: following another user...', function(){

  before(function(done){ 
      
    user1.following.push(ObjectId(user2.id)); 
    user2.save();
    user1.save(done);

});

describe('following was sent to db: ' , function(){

  it('Travis is now following the user ', function(done){
    done();
  })
  after(function(){

    User.findOne({"_id": ObjectId(user1.id)}, function (err, data){
      if (err) throw err;
      if(data.following.indexOf(user2.id)==0){  
        console.log("Following user2 successfully!");

      }
    });
  })
})
})

describe('Tweet Test: unfollowing another user ...', function(){

  before(function(done){
    user1.following.push(ObjectId(user2.id)); 
    user2.save();
    console.log(user1);
    user1.following.shift();
    user1.save(done);
    console.log(user1);
  });
  describe('unfollow was sent to the db: ', function(){
    it('Travis has unfollowed the user ', function(done){
      done();
    })
   after(function(){
    User.findOne({"_id": ObjectId(user1.id)}, function (err, data){
      if (err) throw err;
      if (data.following.indexOf(user2.id==null)){
        console.log("Unfollowing successfully!");
      process.exit();
      }
    });
   })
  })
})

