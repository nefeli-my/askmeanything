const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config();

const AuthenticatorURL = 'http://localhost:' + process.env.AUTH_PORT;

router.get('/',(req, res, next) => {
    console.log(req);
    axios.get(AuthenticatorURL + '/check', {
        headers: req.headers
    })
    .then(result => res.send({username: result.data.username}))
    .catch(err => {
        if (err.response && err.response.status === 401)
            res.status(401).send();
        else
            next(err);
    })
});

module.exports = router;