var express = require('express');
var router = express.Router();
const {create} = require('../server/controllers/AuthService/user')

router.post('/', create);
module.exports = router;