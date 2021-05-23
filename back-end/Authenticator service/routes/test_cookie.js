var express = require('express');
var router = express.Router();
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport');
const dotenv = require('dotenv')
dotenv.config()
console.log(process.env.SECRET)

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
        res.send({
            message: 'access-token ok',
            username: req.user
        });
});

module.exports = router;