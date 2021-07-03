const express = require('express');
const router = express.Router();
const {findFiltered, findAll, findAllRestricted, findByUser} = require('../../server/controllers/QnAService/question');


router.get('/filters', findFiltered);
router.get('/unsigned', findAllRestricted);
router.get('/user/:user',findByUser);
router.get('/:offset', findAll);



module.exports = router;
