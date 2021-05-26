var express = require('express');
var router = express.Router();
const {qPerDay, aPerDay, qPerKeyword} = require('../controllers/general');


router.get('/questions', qPerDay);
router.get('/answers',aPerDay);
router.get('/keywords',qPerKeyword);
module.exports = router;