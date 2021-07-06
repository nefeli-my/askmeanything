var express = require('express');
var router = express.Router();
const {create} = require('../controllers/user')

//create a new user
router.post('/', create);
module.exports = router;