const express = require('express');
const router = express.Router();
const axios = require('axios');

const AuthenticatorURL = process.env.AUTH_URL;

router.get('/',(req, res, next) => {
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