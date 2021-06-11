const express = require('express');
const router = express.Router();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const dotenv = require('dotenv');
const {getall, getfiltered, getallRestricted,getbyuser} = require('../../controllers/question');

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


router.get('/filters' , passport.authenticate('token',{session:false}), getfiltered);
router.get('/unassigned', getallRestricted);
router.get('/user',  passport.authenticate('token',{session:false}), getbyuser)
router.get('/:offset', passport.authenticate('token',{session:false}), getall);

module.exports = router;
