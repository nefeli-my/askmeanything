const express = require('express');
const router = express.Router();
const {findAll, findAllRestricted} = require('../../server/controllers/QnAService/answer');


router.get('/:id', findAll);                    //get all answers of question with questionId
router.get('/unsigned/:id', findAllRestricted); //check if guest can see the question with questionId
                                                     //and if so, get all of its answers

module.exports = router;
