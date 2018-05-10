const express = require('express');
const router = express.Router();

var userController = require('../controllers/user')

router.get('/:userid', userController.userid_get);

module.exports = router;