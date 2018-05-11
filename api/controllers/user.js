var User = require('../models/user');
var passport = require('passport');
require('../config/passport')(passport);
var config = require('../config/database');
var jwt = require('jsonwebtoken');


module.exports.register_post = (req, res, next) => {
    console.log('Entered route');
    if (!req.body.username || !req.body.password) {
        return res.json({success: false, msg: 'Please pass username and password.'});
      } else {
        var newUser = new User({
          username: req.body.username,
          password: req.body.password
        });
        // Save the user
        newUser.save(function(err) {
          if (err) {
            return res.json({success: false, msg: 'Username already exists.'});
          }
          return res.json({success: true, msg: 'Successful created new user.'});
        });
      }
}


module.exports.login_post = (req, res, next) => {
    User.findOne({
        username: req.body.username
      }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          // Check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // If user is found and password is right create a token
              var token = jwt.sign(user, config.secret);
              // Return the information including token as JSON
              return res.json({success: true, token: 'JWT ' + token});
            } else {
              return res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          });
        }
      });
}


// module.exports.userid_get = (req, res, next) => {

//     var userid = parseInt(req.params.userid);
//     console.log("Requesting information for userid:" + req.params.userid)

//     var oneUserPromise = new Promise((resolve, reject) => {
//         User.getUser(userid, (err,users) => {
//           if(err){
//             return reject(err);
//           }else{
//             return resolve(users);
//           }
//         })
//       });
    
//     Promise.all([oneUserPromise]).then((results) => {
//         return res.send({ users: results[0] });
//     }).catch((err)=>{
//         return next(err);
//     });
// }
