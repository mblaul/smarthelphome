const express = require('express');
const router = express.Router();

var userController = require('../controllers/user')

//router.get('/me', VerifyToken, userController.me_get);

router.get('/me', userController.me_get);
router.post('/register', userController.register_post);
router.post('/login', userController.login_post);


module.exports = router;