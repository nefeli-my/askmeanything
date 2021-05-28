const express = require('express');
const router = express.Router();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const dotenv = require('dotenv');
const {getall, getallRestricted} = require('../../controllers/answer');

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

router.get('/:questionId', passport.authenticate('token',{session:false}), getall);
router.get('/unassigned/:questionId', getallRestricted);


module.exports = router;
