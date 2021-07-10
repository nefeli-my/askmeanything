var express = require('express');
var router = express.Router();
const {questionsPerDay, answersPerDay, questionsPerKeyword} = require('../server/controllers/AnalyticsService/general');

// general statistics get endpoints
router.get('/questions/:tz', questionsPerDay);
router.get('/answers/:tz',answersPerDay);
router.get('/keywords',questionsPerKeyword);
module.exports = router;
