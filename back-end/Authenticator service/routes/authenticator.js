var express = require('express');
var router = express.Router();
const {create} = require('../controllers/user')

router.post('/', create);
module.exports = router;