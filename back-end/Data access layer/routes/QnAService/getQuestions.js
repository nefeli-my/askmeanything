const express = require('express');
const router = express.Router();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport');
const dotenv = require('dotenv');
const {findFiltered, findAll, findAllRestricted} = require('../../server/controllers/QnAService/question');

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

router.get('/filters', findFiltered);
router.get('/unassigned', findAllRestricted);
router.get('/:id', findAll);


module.exports = router;
