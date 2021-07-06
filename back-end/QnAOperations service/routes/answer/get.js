const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/checkToken');
const {getall, getallRestricted} = require('../../controllers/answer');


router.get('/:questionId', authenticate, getall);       //get all answers of question with questionId
router.get('/unsigned/:questionId', getallRestricted); //check if guest can see the question with questionId
                                                            //and if so, get all of its answers

module.exports = router;
