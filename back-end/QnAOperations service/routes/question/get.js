const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/checkToken');
const {getall, getfiltered, getallRestricted,getbyuser} = require('../../controllers/question');


router.get('/filters' , authenticate, getfiltered);
router.get('/unassigned', getallRestricted);
router.get('/user',  authenticate, getbyuser)
router.get('/:offset', authenticate, getall);

module.exports = router;
