const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/checkToken');
const {getall, getallRestricted} = require('../../controllers/answer');


router.get('/:questionId', authenticate, getall);
router.get('/unassigned/:questionId', getallRestricted);

module.exports = router;
