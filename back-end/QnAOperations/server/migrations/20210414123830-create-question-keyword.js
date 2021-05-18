'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Question_Keywords', {
      questionId: {
        primaryKey: true,
        allowNull :false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Questions',
          key: 'id'
        }
      },createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      keywordId: {
        primaryKey: true,
        allowNull :false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Keywords',
          key: 'id'
        }
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Question_Keywords');
  }
};