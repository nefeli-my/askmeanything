const express = require('express');
const router = express.Router();
const {create, validate, update} = require('../../server/controllers/user')


router.post('/create', create);
router.post('/validate', validate)
router.post('/update', update)
module.exports = router;