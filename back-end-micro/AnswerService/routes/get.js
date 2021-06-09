const express = require('express');
const router = express.Router();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const dotenv = require('dotenv');
const {findAll,findAllRestricted} = require('../server/controllers/answer');

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
router.get('/unassigned/:id', findAllRestricted);
router.get('/:id',passport.authenticate('token',{session:false}), findAll);

module.exports = router;
