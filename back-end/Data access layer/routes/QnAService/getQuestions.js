const express = require('express');
const router = express.Router();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport');
const dotenv = require('dotenv')
const {findAll} = require('../../server/controllers/QnAService/question');
const {findFiltered} = require('../../server/controllers/QnAService/question');

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
router.get('/filters'/*passport.authenticate('token',{session:false})*/, findFiltered);
router.get('/:id'/*, passport.authenticate('token',{session:false})*/, findAll);
=======
//router.get('/:keyword', passport.authenticate('token',{session:false}), findFiltered);
router.get('/:id', findAll);
>>>>>>> 77f3f13ea1764088e7082b9ede2976f0c7df65d3

module.exports = router;
