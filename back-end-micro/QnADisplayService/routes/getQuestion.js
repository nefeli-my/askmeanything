const express = require('express');
const router = express.Router();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const dotenv = require('dotenv');
const {findFiltered, findAll, findAllRestricted, findByUser} = require('../server/controllers/question');

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

router.get('/filters', passport.authenticate('token',{session:false}), findFiltered);
router.get('/unsigned',  findAllRestricted);
router.get('/user',passport.authenticate('token',{session:false}),findByUser);
router.get('/:offset',passport.authenticate('token',{session:false}), findAll);



module.exports = router;
