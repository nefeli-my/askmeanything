const express = require('express');
const router = express.Router();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const {findAll,findAllRestricted} = require('../server/controllers/answer');


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
// get answers of given question (endpoints for signed-in and unsigned users)
router.get('/unsigned/:id', findAllRestricted);
router.get('/:id',passport.authenticate('token',{session:false}), findAll);

module.exports = router;
