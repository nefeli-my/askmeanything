var express = require('express');
var router = express.Router();
const {checkUser, insertUser} = require('../controllers/user')
const dotenv = require('dotenv')
dotenv.config()

router.post('/', (req, res) => {
    const user = { username, email, firstName, lastName, password, confirmPassword } = req.body;

    // Check if the password and confirm password fields match
    if (password === confirmPassword) {
        const result = checkUser(user);
        // Check if user with the same email is also registered
        result
            .then(exists => {
                if(exists)
                    res.send({
                        message:"User already registered"
                    })
                else{
                    insertUser(user)
                        .then(data => res.send(data))
                        .catch(err => console.log(err))
                }
            })
            .catch(err=>console.log(err))
    } else {
        res.send( {
            message: 'Password does not match.'
        });
    }
});
module.exports = router;