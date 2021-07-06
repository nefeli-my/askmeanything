const axios = require('axios');

const BusURL = process.env.ESB_URL;

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