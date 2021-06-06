const express = require('express');
const router = express.Router();
const {create, validate, update, get} = require('../../server/controllers/AuthService/user');


router.post('/create', create);
router.post('/validate', validate)
router.post('/update', update)
router.get('/get', get)
module.exports = router;
