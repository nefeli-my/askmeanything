const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/checkToken');
const {qPerDay, aPerDay, qPerKeyword} = require('../controllers/user');

router.get('/questions',authenticate, qPerDay);
router.get('/answers',authenticate,aPerDay);
router.get('/keywords',authenticate,qPerKeyword);
module.exports = router;
