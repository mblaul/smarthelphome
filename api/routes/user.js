const express = require('express');
const router = express.Router();
var VerifyToken = require('../middleware/verifyToken')

var userController = require('../controllers/user')

router.get('/me', VerifyToken, userController.me_get);
router.post('/register', userController.register_post);
router.post('/login', userController.login_post);


module.exports = router;