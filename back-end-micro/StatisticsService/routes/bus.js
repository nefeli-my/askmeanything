const express = require('express');
const router = express.Router();
const {create} = require('../server/controllers/user');

router.post('/', (req,res, next) => {
    let action = req.body.event.action;
    if(action === 'createUser'){
        create(req.body.event.user)
            .then(() => res.send({'status':'ok'}))
            .catch(err => next(err))
    }
});

module.exports = router;