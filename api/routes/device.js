const express = require("express");
const router = express.Router();
const passport = require("passport");

var deviceController = require("../controllers/device");

// @route   POST api/device/register
// @desc    Add a new device to the database
// @access  Private
router.post(
	"/register",
	passport.authenticate("jwt", { session: false }),
	deviceController.register_post
);

module.exports = router;
