var User = require("../models/user");
var config = require("../config/config");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");

module.exports.me_get = (req, res, next) => {
  // Route to get who you are using JWTs
  return res.json({
    message: "Welcome! " + res.locals.usertoken.username,
    usertoken: res.locals.usertoken
  });
};

module.exports.register_post = (req, res, next) => {
  if (req.body.username && req.body.password) {
    //Use schema to insert a new user into the db
    User.create(
      {
        username: req.body.username,
        password: req.body.password
      },
      (err, user) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log("New user registered: " + user.username);
          return res.json({ message: "Success, you have been registered.!" });
        }
      }
    );
  }
};

module.exports.login_post = (req, res, next) => {
  if (req.body.username && req.body.password) {
    //Use schema to authenticate a user.
    User.authenticate(req.body.username, req.body.password, (err, user) => {
      if (err || !user) {
        var err = new Error("Wrong email or password, try again!");
        err.status = 401;
        return res.json({ message: err });
      } else {
        //Sign a token for the user, expiresIn determines the length in seconds the token is valid.
        jwt.sign({ user: user }, config.secret, { expiresIn : '4h' },(err, token) => {
          return res.json({
            message: "You have been logged in.",
            token: token,
            tokenexpiry : '4 hours'
          });
        });
      }
    });
  } else {
    var err = new Error("Please send a username and password");
    err.status = 400;
    return res.json({ message: err });
  }
};
