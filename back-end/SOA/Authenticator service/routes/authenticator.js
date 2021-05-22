var express = require('express');
var router = express.Router();
const {create} = require('../server/controllers/user')
const dotenv = require('dotenv')
dotenv.config()

router.post('/', create);
module.exports = router;