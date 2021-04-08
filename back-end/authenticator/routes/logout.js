const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport');
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const {deleteAuthtoken} = require('../controllers/user')

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

router.get('/',  passport.authenticate('token',{session:false}),
    (req, res) => {
        deleteAuthtoken(req.user.username)
            .then(
                (good)=> {
                    if(good) res.send("Alles ok! You logged out!");
                    else res.send("Were you even logged in?")
                }
            )
    });

module.exports = router;