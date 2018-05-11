const express = require('express');
const router = express.Router();

var userController = require('../controllers/user')

router.post('/register', userController.register_post);
router.post('/login', userController.login_post);

//router.get('/:userid', userController.userid_get);

module.exports = router;