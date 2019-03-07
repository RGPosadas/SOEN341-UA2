console.log(process.env.TRAVIS_COMMIT);
console.log(process.env.TRAVIS_COMMIT_MESSAGE);
var User, app, mongoose, request, server, should, user, agent;

should   = require("should");
app      = require("../server");
mongoose = require("mongoose");
User     = mongoose.model("User");
request  = require("supertest");
agent = request.agent(app);

const userCredentials = {
    email: 'travis@travis.com',
    password: 'travis'
}
const userCredentials2 ={
  email:'travis@travis.com',
  password: 'wrongpassword'
}
describe('User', function () {
  describe('Login test', function () {
      it('The app should redirect to /profile when log in successful', function (done) {
        agent
        .post('/users/login')
         .send(userCredentials)
        .expect('Location','/profile')
        .end(done)
//         .end(function (err, res) {
//                console.log('***************************Authenticated*********************************************');
//                done();
//            });
      }
      )
      it('The app should redirect to /login when log in failed', function (done) {
        agent
        .post('/users/login')
         .send(userCredentials2)
        .expect('Location','/users/login')
        .end(done)
//         
      }
      )

  after(function(done) {
     process.exit();
    });

})
})
