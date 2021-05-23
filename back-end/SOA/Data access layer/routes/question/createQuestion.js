const express = require('express');
const router = express.Router();
const {create} = require('../../server/controllers/question')


router.post('/', create);

module.exports = router;
