'use strict';
const data = require('../dummy_data/questions_keywords.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Question_Keywords', data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Question_Keywords', null, {});
  }
};
