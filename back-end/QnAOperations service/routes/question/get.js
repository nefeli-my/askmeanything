const express = require('express');
const router = express.Router();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const dotenv = require('dotenv');
const {getall, getfiltered, getallRestricted} = require('../../controllers/question');

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

<<<<<<< HEAD
router.get('/filters' , passport.authenticate('token',{session:false}), getfiltered);
router.get('/unassigned', getallRestricted)
router.get('/:id',passport.authenticate('token',{session:false}), getall);
=======
router.get('/filters' /*, passport.authenticate('token',{session:false})*/, getfiltered);
router.get('/:id',/*passport.authenticate('token',{session:false}),*/ getall);
>>>>>>> c7a69da3864f6c226651e283514e4bef92969075

module.exports = router;
