const models = require('../models');
const Messages = models.Messages;


module.exports = {
    async create(message_id) {
        return Messages.create({id:message_id})
    },
    async getLast(){
        return Messages.findOne({
            order: [['id', 'DESC']],
            attributes: ['id']
        })
    }
};