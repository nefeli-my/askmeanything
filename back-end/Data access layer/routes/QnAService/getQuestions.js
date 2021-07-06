const express = require('express');
const router = express.Router();
const {findFiltered, findAll, findAllRestricted, findByUser} = require('../../server/controllers/QnAService/question');


router.get('/filters', findFiltered);       //get questions that match the given filters (author, keyword, date)
router.get('/unsigned', findAllRestricted); //get 10 most recent questions that a guest can see
router.get('/user/:user',findByUser);       //get questions that the signed-in user created/contributed to
router.get('/:offset', findAll);            //get 10 most recent questions after given offset



module.exports = router;
