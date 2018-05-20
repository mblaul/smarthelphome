var User = require('../models/user');
var passport = require('passport');
var config = require('../config/database');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');



module.exports.me_get = (req, res, next) =>{
  token = req.headers['authorization'];
  // Route to get who you are using JWTs
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        return res.json({ message : 'You are not authorized to be here'});
      } else {
        return res.json({ 
          message : 'You\'re allowed to be here',
          authData : req.Token
        });
      }
    });
}

module.exports.register_post = (req, res, next) => {
  if (req.body.username && req.body.password) {
      var userData = {
        username: req.body.username,
        password: req.body.password,
      }
    //Use schema to insert a new user into the db
    User.create({
      username : req.body.username,
      password : req.body.password
    }, (err, user) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log('New user registered: ' + user.username);
        return res.json({ message : 'Success, you have been registered.!' });
      }
    });
  }
}

module.exports.login_post = (req, res, next) => {
  if (req.body.username && req.body.password){
    //Use schema to authenticate a user.
    User.authenticate(req.body.username, req.body.password, (err, user) => {
      if (err || !user) {
        var err = new Error('Wrong email or password, try again!');
        err.status = 401;
        return res.json({ message : err })
      } else {
        jwt.sign({ user : user }, 'secretkey', (err, token) => {
          return res.json({message : "You have been logged in." , token : token });
        });
      }
    });
  } else {
    var err = new Error('Please send a username and password');
    err.status = 400;
    return res.json({ message : err });
  }
}
