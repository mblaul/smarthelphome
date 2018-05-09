var User = require('../models/user');


module.exports.index_get = (req, res, next) => {
    return res.send({ express: 'Hello World!' });
}

module.exports.users_get = (req, res, next) => {
    var userid = parseInt(req.params.userid);
    console.log("Requesting information for userid:" + req.params.userid)
    var oneUserPromise = new Promise((resolve, reject) => {
        User.getUser(userid, (err,users) => {
          if(err){
            return reject(err);
          }else{
            return resolve(users);
          }
        })
      });
    
    Promise.all([oneUserPromise]).then((results) => {
        return res.send({ users: results[0] });
    }).catch((err)=>{
        return next(err);
    });
}
