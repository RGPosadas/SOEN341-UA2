var User, app, mongoose, request, server, should, user, agent;
should   = require("should");
app      = require("../server");
mongoose = require("mongoose");
const Tweet = require("../database_models/tweet_model");
request  = require("supertest");
agent = request.agent(app);
const expect = require('chai').expect





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

      tweet = new Tweet({
          tweet:tweetToPost,
      user_id: "travis",
      first_name: "travis",
      last_name: "travis",
      liked_by: []
      });
      tweet.save(done)});


  describe('tweet sended to db:'+tweetToPost, function () {

      it('The tweet has been posted', function (done) {
       done();
      })


      after(function(){
          var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);
          Tweet.findOne({ tweet: tweetToPost }, function (err, data) {
          if (err) throw err;
          console.log("Query results: " + data);
            if(data.tweet == tweetToPost){
                console.log("Tweet successfully found in database");
            }
      });
      })

})
})
/*describe('Tweet Test:liking a tweet...', function () {
  var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);
  
  before(function (done) {
     
    Tweet.update({tweet:tweetToPost},{$set:{liked_by : "travis"}});
  
    tweet.save(done)
  });

  
describe('like sended to db:'+tweetToPost, function () {

    it('The tweet was liked by travis', function (done) {
     done();
    })

    
    after(function(){
        var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);      
        Tweet.findOne({ liked_by: "travis" }, function (err, data) {
        if (err) throw err;
        console.log("Query results: " + data);
          if(data.liked_by.includes("travis")){
              console.log("Liked successfully");
              process.exit();
          }
         
    });
 
    })

})
})*/



  describe('Extra feature test', function () {
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
          process.exit();
      })
      
  
});
  });





 
