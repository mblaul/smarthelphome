const express = require('express');
const router = express.Router();

//API routes i.e. smarthomehelp.com/api/{route}
//router.get('/api/hello',homeController.index_get);
router.use('/api/user', require('./user'));

module.exports = router;