const express = require('express');
const router = express.Router();
const {questionsPerDay, answersPerDay, questionsPerKeyword} = require('../server/controllers/AnalyticsService/general');
const {questionsPerDay: userQPerDay, questionsPerKeyword: userQPerKeyword, answersPerDay: userAPerDay} = require('../server/controllers/AnalyticsService/user')


router.get('/general/questions', questionsPerDay);
router.get('/general/answers',answersPerDay);
router.get('/general/keywords',questionsPerKeyword);
router.get('/user/questions/:id',userQPerDay);
router.get('/user/answers/:id',userAPerDay);
router.get('/user/keywords/:id',userQPerKeyword);

module.exports = router;