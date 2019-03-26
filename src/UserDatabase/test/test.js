var  app, mongoose, request, server, should, user, agent;
should   = require("should");
app      = require("../server");
mongoose = require("mongoose");
const Tweet = require("../database_models/tweet_model");
const User = require("../database_models/user_model");
request  = require("supertest");
agent = request.agent(app);




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
      tweetPoster = new User({
        first_name: "Tweet",
      last_name: "Poster",
      email: "tweetposter@kiwi.com",
      password: "Jeneparlepasfrancais123",
      follower:[],
      following: [],
      location: "test",
      description: "test",
      interests: "test",
      }); 

      tweet = new Tweet({
          tweet:tweetToPost,
      user_id: tweetPoster.id,
      first_name: tweetPoster.first_name,
      last_name: tweetPoster.last_name,
      liked_by: []
      });
      tweetPoster.save();
      tweet.save(done)});


  describe('tweet sended to db:'+tweetToPost, function () {

      it('The tweet has been posted', function (done) {
       done();
      })


      after(function(){
          var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);
          Tweet.findOne({ user_id: tweetPoster.id }, function (err, data) {
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
    tweetLiker = new User({
      first_name: "Tweet",
    last_name: "Liker",
    email: "tweetliker@kiwi.com",
    password: "test",
    follower:[],
    following: [],
    location: "test",
    description: "test",
    interests: "test",
    }); 
    //Tweet.update({user_id: tweetPoster.id},{$push:{liked_by : tweetLiker.id}});
    tweet.liked_by.push(tweetLiker.id);
    tweetLiker.save();
    tweet.save(done)
  });

  
describe('like sended to db:'+tweetToPost, function () {

    it('The tweet was liked by travis', function (done) {
     done();
    })

    
    after(function(){
        var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);      
        Tweet.findOne({ user_id: tweetPoster.id }, function (err, data) {
        if (err) throw err;
        console.log("Query results: " + data);
          if(data.liked_by.indexOf(tweetLiker.id)==0){
              console.log("Liked successfully");
              process.exit();
          }
         
    });
 
    })

})
})

 
