const express = require('express');
const router = express.Router();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport');
const dotenv = require('dotenv')
const {findAll} = require('../../server/controllers/question')
const {findFiltered} = require('../../server/controllers/question')

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

//router.get('/:keyword', passport.authenticate('token',{session:false}), findFiltered);
router.get('/:id'/*, passport.authenticate('token',{session:false})*/, findAll);

module.exports = router;
