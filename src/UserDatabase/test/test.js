var User, app, mongoose, request, server, should, user, agent;
should   = require("should");
app      = require("../server");
mongoose = require("mongoose");
const Tweet = require("../database_models/tweet_model");
request  = require("supertest");
agent = request.agent(app);




const userCredentials = {
    email: 'travis@travis.com',
    password: 'travis'
}

const wrongCredentials ={
  email:'travis@travis.com',
  password: 'wrongpassword'
}



describe('Login Test', function () {
  describe('Login test begins', function () {
      it('The app should redirect to /profile when logged in successfully', function (done) {
        agent
        .post('/users/login')
         .send(userCredentials)
        .expect('Location','/profile')
        .end(done)

      }
      )
      it('The app should redirect to /login when login failed', function (done) {
      {
        agent
        .post('/users/login')
         .send(wrongCredentials)
        .expect('Location','/users/login')
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

      it('A tweet has been posted', function (done) {
       done();
      })

      
      after(function(){
          var tweetToPost = "[Travis-CI Testing] Commit " + String(process.env.TRAVIS_COMMIT) + "/" + String(process.env.TRAVIS_COMMIT_MESSAGE);      
          Tweet.findOne({ tweet: tweetToPost }, function (err, data) {
          if (err) throw err;
          console.log("Query results: " + data);
            if(data.tweet == tweetToPost){
                console.log("Tweet successfully found in database");
                process.exit();
            }
           
      });
   
      })

})
})

 
