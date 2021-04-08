const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const mysql = require('mysql');
const router = express.Router();
const jwt = require('jsonwebtoken')
const {createAuthtoken, checkUserS} = require('../controllers/user')

passport.use('signin', new LocalStrategy((function (username, password, done){
    let user_auth = {username, password};
    const result = checkUserS(user_auth);
    result
        .then(data => done(null,data))
})))

router.post('/', passport.authenticate('signin',{session:false}),
    (req, res) => {
        let username = req.user;
        let token = jwt.sign({username}, process.env.SECRET, { expiresIn: 60 });
        let refreshToken = jwt.sign({username}, process.env.REFRESH_SECRET);
        createAuthtoken(refreshToken,username)
            .then((refreshToken)=>{
                    res.send({token, refreshToken})

            });
});
module.exports = router;