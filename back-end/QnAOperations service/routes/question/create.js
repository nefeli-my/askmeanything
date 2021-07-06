const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/checkToken');
const {create} = require('../../controllers/question');

//create a new question 
router.post('/', authenticate, create);

module.exports = router;
