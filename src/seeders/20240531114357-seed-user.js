'use strict';

const { v4: uuidv4 } = require('uuid'); // To generate UUIDs

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        userid: uuidv4(),
        username: 'john_doe',
        email: 'john.doe@example.com',
        gender: 'male',
        password: 'hashedpassword1', // Replace with hashed password
        lastlogin: new Date(),
        usertype: 'customer',
        isactive: true,
        isVarified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userid: uuidv4(),
        username: 'jane_doe',
        email: 'jane.doe@example.com',
        gender: 'female',
        password: 'hashedpassword2', // Replace with hashed password
        lastlogin: new Date(),
        usertype: 'vendor',
        isactive: true,
        isVarified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
