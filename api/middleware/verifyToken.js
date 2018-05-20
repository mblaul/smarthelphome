//Middlware to handle token verification

// FORMAT OF TOKEN
// Authorization: <access_token>
var jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    //Check if token is used is undefined
    if(typeof token !== 'undefined') {
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err) {
                return res.json({ message : 'You are not authorized to be here'});
            } else {
                // res.json({ 
                //     message : 'You\'re allowed to be here',
                //     authData
                // });
            return next();
            }
          });
        return next();
    } else {
        //Forbidden
        return next(res.sendStatus(403));
    }
}