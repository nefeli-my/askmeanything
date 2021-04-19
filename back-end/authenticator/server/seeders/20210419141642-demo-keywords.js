'use strict';
const data = require('../dummy_data/keywords.json')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Keywords', data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Keywords', null, {});
  }
};
