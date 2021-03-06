const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const {questionsPerDay, questionsPerKeyword, answersPerDay} = require('../server/controllers/AnalyticsService/user')
const dotenv = require('dotenv')

dotenv.config()
passport.use('token', new JWTstrategy(
    {
        secretOrKey: process.env.SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    function(token, done) {
        return done(null, token.username)
    }
    )
)

// personalized statistics get endpoints
// (user's token validation required)
router.get('/questions/:tz',passport.authenticate('token',{session:false}), questionsPerDay);
router.get('/answers/:tz',passport.authenticate('token',{session:false}),answersPerDay);
router.get('/keywords',passport.authenticate('token',{session:false}),questionsPerKeyword);
module.exports = router;
