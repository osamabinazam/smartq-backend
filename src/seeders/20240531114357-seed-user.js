'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = [
      {
        userid: uuidv4(),
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: bcrypt.hashSync('password123', 10),
        usertype: 'vendor',
        isactive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userid: uuidv4(),
        username: 'jane_smith',
        email: 'jane.smith@example.com',
        password: bcrypt.hashSync('password123', 10),
        usertype: 'vendor',
        isactive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userid: uuidv4(),
        username: 'william_brown',
        email: 'william.brown@example.com',
        password: bcrypt.hashSync('password123', 10),
        usertype: 'vendor',
        isactive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userid: uuidv4(),
        username: 'emma_johnson',
        email: 'emma.johnson@example.com',
        password: bcrypt.hashSync('password123', 10),
        usertype: 'customer',
        isactive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userid: uuidv4(),
        username: 'liam_wilson',
        email: 'liam.wilson@example.com',
        password: bcrypt.hashSync('password123', 10),
        usertype: 'customer',
        isactive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    try{
      await queryInterface.bulkInsert('users', users, {});
    
    }

    catch(error){
      console.error('Error in seeder: ', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.bulkDelete('users', null, {});
    }
      
      catch(error){
        console.error('Error in seeder: ', error);
      }
  }
};
