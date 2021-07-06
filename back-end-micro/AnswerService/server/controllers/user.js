const models = require('../models');
const User = models.User;

// user creation controller, Sequelize ORM used
// used for updating the Answer's microservice's database
// after new user creation via the Authenticator Microservice
module.exports = {
    async create(user) {
        return User.create(user)
    }
};
