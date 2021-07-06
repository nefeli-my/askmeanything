const express = require('express');
const router = express.Router();
const axios = require('axios');

const AuthenticatorURL = process.env.AUTH_URL;

//pass authorization header to Authenticator service to confirm validity of given token
router.get('/',(req, res, next) => {
    axios.get(AuthenticatorURL + '/check', {
        headers: {
            'authorization': req.headers.authorization
        }
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