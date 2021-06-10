const models = require('../models');
const Answer = models.Answer;


module.exports = {
    async create(answer) {
        return Answer.create(answer);
    }
};