console.log(process.env.TRAVIS_COMMIT);
console.log(process.env.TRAVIS_COMMIT_MESSAGE);
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

  after(function(done) {
      console.log("    Login test ends");
    // process.exit();
    });

})
})



describe('Tweet Test', function () {
    var travisCommitMessage = '<%= process.env.TRAVIS_COMMIT_MESSAGE %>';
    before(function(done) {
      tweet = new Tweet({
          tweet: travisCommitMessage,
      user_id: "travis",
      first_name: "travis",
      last_name: "travis",
      liked_by: []
      });
      tweet.save(done)
    });
    
  describe('A tweet has been posted. Tweet test begins', function () {
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

  after(function(done) {
      console.log("    Tweet test ends");
     process.exit();
    });

})
})
