const express = require('express');
const router = express.Router();
const {findFiltered, findAll, findAllRestricted} = require('../../server/controllers/QnAService/question');


router.get('/filters', findFiltered);
router.get('/unassigned', findAllRestricted);
router.get('/:id', findAll);


module.exports = router;
