'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AuthTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tokenstr: {
        allowNull:false,
        type: Sequelize.STRING(1000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId:
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            references: {
              model: 'Users',
              key: 'id'
            }

          }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AuthTokens');
  }
};