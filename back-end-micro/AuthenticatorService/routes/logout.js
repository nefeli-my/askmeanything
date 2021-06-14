const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

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

router.delete('/',  passport.authenticate('token',{session:false}),(req,res,next)=>{
    res.send({message:`Bye, ${req.user}!`});
});

module.exports = router;