var express = require('express');

var user = require('../controllers/user');

var router = express.Router();

router.post('/register',user.createUser);

router.get('/getUserByEmail',user.getUserByEmail);

module.exports = router;