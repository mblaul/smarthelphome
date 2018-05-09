const express = require('express');
const router = express.Router();
var homeController = require('../controllers/users');

//Home page routes i.e. mysite.com/{route}
router.get('/api/hello',homeController.index_get);
router.get('/api/users/:userid',homeController.users_get);
module.exports = router;
