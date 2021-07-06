var express = require('express');
var router = express.Router();
const {create} = require('../server/controllers/AuthService/user')

// user registration route
router.post('/', create);
module.exports = router;