const express = require('express');
const router = express.Router();
var homeController = require('../controllers/home');

//Home page routes i.e. mysite.com/{route}
router.get('/api/hello',homeController.index_get);
router.get('/api/users',homeController.users_get);
module.exports = router;
