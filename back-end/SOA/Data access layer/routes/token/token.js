const express = require('express');
const router = express.Router();
const {create, remove, validate} = require('../../server/controllers/token')


router.post('/create', create);
router.post('/delete', remove)
router.post('/validate', validate)
module.exports = router;