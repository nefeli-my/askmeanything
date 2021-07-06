const models = require('../models');
const User = models.User;

// create user using Sequelize ORM after corresponding notification by bus
module.exports = {
    async create(user) {
        return User.create(user)
    }
};