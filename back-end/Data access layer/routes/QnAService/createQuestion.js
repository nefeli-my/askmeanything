const express = require('express');
const router = express.Router();
const {create} = require('../../server/controllers/QnAService/question');


router.post('/', create);
module.exports = router;
