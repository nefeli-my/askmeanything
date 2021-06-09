const models = require('../models');
const User = models.User;
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");

module.exports = {
    async create(user) {
        return User.create(user)
    }
};