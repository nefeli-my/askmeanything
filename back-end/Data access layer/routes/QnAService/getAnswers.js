const express = require('express');
const router = express.Router();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport');
const dotenv = require('dotenv')
const {findAll, findAllRestricted} = require('../../server/controllers/QnAService/answer');


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

router.get('/:id', findAll);
router.get('/unassigned/:id', findAllRestricted);

module.exports = router;
