var User = require('../models/user');

module.exports.register_post = (req, res, next) => {
    return res.send({route : 'Active!'});
}


module.exports.login_post = (req, res, next) => {
    return res.send({route : 'Active!'});
}



module.exports.userid_get = (req, res, next) => {

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
