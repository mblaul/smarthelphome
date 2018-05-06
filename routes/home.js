const express = require('express');
const router = express.Router();
var homeController = require('../controllers/home');

//Home page routes i.e. mysite.com/{route}
router.get('/',homeController.index_get);

module.exports = router;
