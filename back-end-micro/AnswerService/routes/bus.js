const express = require('express');
const router = express.Router();
const {create} = require('../server/controllers/user');
const {create:createQ} = require('../server/controllers/question');
const {create:createM} = require('../server/controllers/message');

// post endpoints to accept bus messages (for handling data integrity issues)
router.post('/', (req,res, next) => {
    let action = req.body.event.action;
    if(action === 'createUser'){
        create(req.body.event.user)
           .then(() => createM(req.body.id))
            .then(() => res.send({'status':'ok'}))
            .catch(err => next(err))
    }
    else if(action === 'createQuestion'){
        createQ(req.body.event.question)
           .then(() => createM(req.body.id))
            .then(() => res.send({'status':'ok'}))
            .catch(err => next(err))
    }
});

module.exports = router;
