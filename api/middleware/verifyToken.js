module.exports = function(req, res, next) {
    const bearerHeader = req.header['authorization'];

    //Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        
    } else {
        res.sendStatus(403);
    }
}