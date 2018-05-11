const express = require('express');
const router = express.Router();

var userController = require('../controllers/user')

router.get('/:userid', userController.userid_get);

router.post('/register', userController.register_post);
router.post('/login', userController.login_post);

module.exports = router;