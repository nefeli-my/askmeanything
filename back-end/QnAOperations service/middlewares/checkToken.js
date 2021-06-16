const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config()
const BusURL = 'http://localhost:' + process.env.BUS_PORT;


module.exports = function(req,res,next) {
    axios.get(BusURL + '/authenticate', {
        headers: req.headers
    })
    .then(response => {
        req.user = response.data.username;
        next();
    })
    .catch(err => {
        res.status(401).send('Unauthorized')
    })
}