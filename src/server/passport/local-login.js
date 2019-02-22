const jwt = require('jsonwebtoken');
const UserModel = require('../models/users.js');
const RolesModel = require('../models/roles.js');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  console.log("req ep:", req.password, req.email);
  console.log("em pas: ", email, password);
  const userData = {
    email: email.trim(),
    password: password.trim()
  };
  console.log('beforereturn');
  // return done(null, 'sdfosdf', {});
  // find a user by email address

  return UserModel.users([{ email: userData.email }], (err, user) => {
    if (err) { return done(err); }

    if (!user) {  //set here
      console.log('NO');
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';
      console.log('done');
      return done(error);
    }

    return UserModel.comparePassword(userData.password, user.password, (passwordErr, isMatch) => {
      console.log("comparePassword");
      if (passwordErr) { return done(passwordErr); }

      if (!isMatch) {
        console.log("match");
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      RolesModel.findById(user.roleId, function(err, role) {
        if (err || !role) {
          console.log("findRole error", err);
          //user.role = undefined;
          //return done(error) or seperate if (!roles)
        }

        const payload = {
          sub: user._id
        };

        user.lastSignIn = new Date().toLocaleString();
        UserModel.updateUser(user, function(err, result) {
          if (err) {
            console.log("cant update file", err);
          }
          console.log("result of time update", result);

          // create a token string
          const token = jwt.sign(payload, config.jwtSecret);
          const data = {
            // user object to client
            id: user._id,
            role: role || undefined,
            firstName: user.FirstName,
            lastName: user.LastName,
            email: user.email,
            primaryImage: user.primaryImage || undefined
          };
          console.log("DATA", data)
          return done(null, token, data);
        });
      });
    });
  });
});