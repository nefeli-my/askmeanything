const {validate} = require('../controllers/user')
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const router = express.Router();
const jwt = require('jsonwebtoken')

passport.use('signin', new LocalStrategy((async function (username, password, done){
    let user_auth = {username, password};
    const result = await validate(user_auth)
        .then(data => done(null,data))
})))

router.post('/', passport.authenticate('signin',{session:false}),(req,res,next)=>{
    let username = req.user;
    let accessToken = jwt.sign({username}, process.env.SECRET, {expiresIn: '12h'});
    res.send({accessToken})
});
module.exports = router;
