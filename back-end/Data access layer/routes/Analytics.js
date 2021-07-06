const express = require('express');
const router = express.Router();
const {questionsPerDay, answersPerDay, questionsPerKeyword} = require('../server/controllers/AnalyticsService/general');
const {questionsPerDay: userQPerDay, questionsPerKeyword: userQPerKeyword, answersPerDay: userAPerDay} = require('../server/controllers/AnalyticsService/user')


router.get('/general/questions', questionsPerDay);  //route for retrieving number of questions posted per day in the last week
router.get('/general/answers',answersPerDay);       //route for retrieving number of answers posted per day in the last week
router.get('/general/keywords',questionsPerKeyword);//route for retrieving the 20 most used keywords
router.get('/user/questions/:id',userQPerDay);      //route for retrieving number of questions posted per day in the last week by signed-in user
router.get('/user/answers/:id',userAPerDay);        //route for retrieving number of answers posted per day in the last week by signed-in user
router.get('/user/keywords/:id',userQPerKeyword);   //route for retrieving the 20 most used keywords by signed-in user
module.exports = router;