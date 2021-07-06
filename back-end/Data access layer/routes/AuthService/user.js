const express = require('express');
const router = express.Router();
const {create, validate, update, get} = require('../../server/controllers/AuthService/user');

router.post('/create', create);     //create new user
router.post('/validate', validate)  //validate given credentials
router.post('/update', update)      //update personal info of signed-in user
router.get('/get/:id', get)         //get personal info of signed-in user
module.exports = router;
