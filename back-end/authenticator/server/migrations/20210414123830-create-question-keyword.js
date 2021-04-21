'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Question_Keywords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionId: {
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
        allowNull :false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Keywords',
          key: 'id'
        }
      },
      sequence: {
        autoIncrement: true,
        type: Sequelize.SMALLINT
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Question_Keywords');
  }
};