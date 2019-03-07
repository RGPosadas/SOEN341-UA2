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
//         .end(function (err, res) {
//                console.log('***************************Authenticated*********************************************');
//                done();
//            });
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
     process.exit();
    });

})
})
