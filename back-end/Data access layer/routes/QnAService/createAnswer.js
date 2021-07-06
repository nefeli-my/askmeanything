const express = require('express');
const router = express.Router();
const {create} = require('../../server/controllers/QnAService/answer');

//create a new answer
router.post('/', create);

module.exports = router;
