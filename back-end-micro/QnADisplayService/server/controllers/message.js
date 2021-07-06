const models = require('../models');
const Messages = models.Messages;

// create bus message and get last message stored in microservice's database
// Sequelize ORM used
module.exports = {
    async create(message_id) {
        return Messages.findOne({
            order: [['id', 'DESC']],
            attributes: ['id']
        })
            .then(async res => {
                if(res) await Messages.update({id: message_id}, {where:{id:res.id}})
                else await Messages.create({id:message_id})
            })
    },
    async getLast(){
        return Messages.findOne({
            order: [['id', 'DESC']],
            attributes: ['id']
        })
    }
};