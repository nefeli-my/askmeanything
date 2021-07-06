const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport');
const express = require('express');
const router = express.Router();
const {update} = require('../controllers/user')

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

//update personal info of signed-in user
router.patch('/',  passport.authenticate('token',{session:false}), update);

module.exports = router;