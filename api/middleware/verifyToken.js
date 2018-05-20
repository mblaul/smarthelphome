//Middlware to handle token verification

// FORMAT OF TOKEN
// Authorization: <access_token>

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    //Check if token is used is undefined
    if(typeof token !== 'undefined') {
        return next();
    } else {
        //Forbidden
        return next(res.sendStatus(403));
    }
}