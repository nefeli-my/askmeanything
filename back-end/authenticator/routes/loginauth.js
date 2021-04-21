const {validate} = require('../server/controllers/user')
const {create} = require('../server/controllers/authtoken')
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const router = express.Router();
const jwt = require('jsonwebtoken')

passport.use('signin', new LocalStrategy((function (username, password, done){
    let user_auth = {username, password};
    const result = validate(user_auth);
    result
        .then(data => done(null,data))
})))

router.post('/', passport.authenticate('signin',{session:false}),create);
module.exports = router;