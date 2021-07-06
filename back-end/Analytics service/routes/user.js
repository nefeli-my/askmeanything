const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/checkToken');
const {qPerDay, aPerDay, qPerKeyword} = require('../controllers/user');

router.get('/questions',authenticate, qPerDay);   //route for retrieving number of questions posted per day in the last week by signed-in user
router.get('/answers',authenticate,aPerDay);      //route for retrieving number of answers posted per day in the last week by signed-in user
router.get('/keywords',authenticate,qPerKeyword); //route for retrieving the 20 most used keywords by signed-in user
module.exports = router;
