const express = require('express');
const router = express.Router();
const {findAll, findAllRestricted} = require('../../server/controllers/QnAService/answer');


router.get('/:id', findAll);
router.get('/unassigned/:id', findAllRestricted);

module.exports = router;
