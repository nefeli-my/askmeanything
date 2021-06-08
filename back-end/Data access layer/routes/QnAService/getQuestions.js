const express = require('express');
const router = express.Router();
const {findFiltered, findAll, findAllRestricted, findByUser} = require('../../server/controllers/QnAService/question');


router.get('/filters', findFiltered);
router.get('/unassigned', findAllRestricted);
router.get('/user/:user',findByUser);
router.get('/:id', findAll);



module.exports = router;
