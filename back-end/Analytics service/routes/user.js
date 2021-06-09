const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const {qPerDay, aPerDay, qPerKeyword} = require('../controllers/user');
const dotenv = require('dotenv')

dotenv.config()
passport.use('token', new JWTstrategy(
    {
        secretOrKey: process.env.SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    function(token, done) {
        return done(null, token)
    }
    )
)

router.get('/questions',passport.authenticate('token',{session:false}), qPerDay);
router.get('/answers',passport.authenticate('token',{session:false}),aPerDay);
router.get('/keywords',passport.authenticate('token',{session:false}),qPerKeyword);
module.exports = router;
