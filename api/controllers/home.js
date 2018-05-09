var User = require('../models/user');

module.exports.index_get = (req, res, next) => {
  
    return res.send({ express: 'Hello World!' });

}
module.exports.users_get = (req, res, next) => {
  
    User.find({}, (err, users) => {
        if(err){
            console.log(err);
            return;
        } else {
             return res.send({ users:users });
        }
    })
    

}
