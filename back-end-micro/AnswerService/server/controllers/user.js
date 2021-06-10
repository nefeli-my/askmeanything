const models = require('../models');
const User = models.User;

module.exports = {
    async create(user) {
        return User.create(user)
    }
};