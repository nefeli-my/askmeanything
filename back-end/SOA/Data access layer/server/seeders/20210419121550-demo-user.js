'use strict';
const fs = require('fs')
const data = require('../dummy_data/users.json')


module.exports = {
  up: async (queryInterface, Sequelize) => {

        await queryInterface.bulkInsert('Users', data)
      }

  ,

  down: async (queryInterface, Sequelize) => {
    console.log("fail")
     await queryInterface.bulkDelete('Users', null, {});
  }
};
