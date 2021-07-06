var express = require('express');
var router = express.Router();
const {questionsPerDay, answersPerDay, questionsPerKeyword} = require('../server/controllers/AnalyticsService/general');

// general statistics get endpoints
router.get('/questions', questionsPerDay);
router.get('/answers',answersPerDay);
router.get('/keywords',questionsPerKeyword);
module.exports = router;
