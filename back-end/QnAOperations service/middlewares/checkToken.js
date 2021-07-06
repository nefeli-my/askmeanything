const axios = require('axios');

const BusURL = process.env.ESB_URL;

//middleware that uses ESB to communicate with Authenticator service in order to confirm the validity of given token
module.exports = function(req,res,next) {
    axios.get(BusURL + '/authenticate', {
        headers: {
            'authorization': req.headers.authorization
        }
    })
    .then(response => {
        req.user = response.data.username;
        next();
    })
    .catch(err => {
        res.status(401).send('Unauthorized')
    })
}