var express = require('express');
var router = express.Router();
const {qPerDay, aPerDay, qPerKeyword} = require('../controllers/general');

router.get('/questions', qPerDay);   //route for retrieving number of questions posted per day in the last week
router.get('/answers',aPerDay);      //route for retrieving number of answers posted per day in the last week
router.get('/keywords',qPerKeyword); //route for retrieving the 20 most used keywords

module.exports = router;