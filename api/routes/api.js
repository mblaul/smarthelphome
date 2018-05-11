const express = require('express');
const router = express.Router();

//Route to test server
var homeController = require('../controllers/hello');
router.get('/api/hello',homeController.helloworld_get);

//API routes i.e. smarthomehelp.com/api/{route}
router.use('/api/user', require('./user'));

module.exports = router;