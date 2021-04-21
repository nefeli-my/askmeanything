const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const {validate} = require('../server/controllers/authtoken')
const dotenv = require('dotenv')
dotenv.config()

passport.use('refresh_token', new JWTstrategy(
    {
        secretOrKey: process.env.REFRESH_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    function(token, done) {
        const old_token=jwt.sign(token, process.env.REFRESH_SECRET);
        validate(token.username, old_token)
            .then((data) =>{
                if(token && data.length != 0 ){
                    const username = token.username;
                    let new_token = jwt.sign({username}, process.env.SECRET, { expiresIn: 300 });
                    return done(null,{new_token});
                }
                return done(null, false)
            })
    }
    )
)

router.get('/',  passport.authenticate('refresh_token',{session:false}),
    (req, res) => {
        res.send({
            accessToken:req.user.new_token
        });
    });

module.exports = router;