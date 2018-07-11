const express = require("express");
const router = express.Router();
const passport = require("passport");

var userController = require("../controllers/user");

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	userController.me_get
);

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", userController.register_post);

// @route   POST api/users/login
// @desc    Login user / Returning JWT token
// @access  Public
router.post("/login", userController.login_post);

module.exports = router;
