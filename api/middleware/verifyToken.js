//Middlware to handle token verification

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
var config = require("../config/config");
var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	var token = req.headers["authorization"];
	//Check if token is used is undefined
	if (typeof token !== "undefined") {
		jwt.verify(token, config.secret, (err, authData) => {
			if (err) {
				return res.json({ message: "You are not authorized to be here" });
			} else {
				var usertoken = {
					id: authData.user._id,
					username: authData.user.username
				};
				res.locals.usertoken = usertoken;
				return next();
			}
		});
	} else {
		//Forbidden
		return res.sendStatus(403);
	}
};
