const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/checkToken');
const {create} = require('../../controllers/answer');

//create a new answer
router.post('/', authenticate, create);

module.exports = router;
