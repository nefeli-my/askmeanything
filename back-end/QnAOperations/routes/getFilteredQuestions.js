const express = require('express');
const router = express.Router();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport');
const dotenv = require('dotenv')
const {findFiltered} = require('../server/controllers/question')


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

router.get('/:author&:keyword&:start_date&:end_date', passport.authenticate('token',{session:false}), findFiltered);

module.exports = router;
