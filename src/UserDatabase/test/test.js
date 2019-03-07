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
describe('User', function () {
  describe('Login test', function () {
      it('should redirect to /profile', function (done) {
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

  after(function(done) {
     process.exit();
    });

})
})
