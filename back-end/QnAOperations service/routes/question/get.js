const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/checkToken');
const {getall, getfiltered, getallRestricted,getbyuser} = require('../../controllers/question');


router.get('/filters' , authenticate, getfiltered); //get questions that match the given filters (author, keyword, date)
router.get('/unsigned', getallRestricted);          //get 10 most recent questions that a guest can see
router.get('/user',  authenticate, getbyuser)       //get questions that the signed-in user created/contributed to
router.get('/:offset', authenticate, getall);       //get 10 most recent questions after given offset

module.exports = router;
