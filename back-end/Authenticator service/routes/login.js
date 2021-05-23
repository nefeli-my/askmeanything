const {validate} = require('../controllers/user')
const {create} = require('../controllers/authtoken')
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const router = express.Router();
const jwt = require('jsonwebtoken')

passport.use('signin', new LocalStrategy((async function (username, password, done){
    let user_auth = {username, password};
    const result = await validate(user_auth)
        .then(data => done(null,data))
})))

router.post('/', passport.authenticate('signin',{session:false}),create);
module.exports = router;
