'use strict';
require('dotenv').config(); 
const { v4: uuidv4 } = require('uuid');
const UserModel = require('../models/User');
const db = require('../models/index')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const User = db.UserModel
    const users = await User.findAll();
    const contacts = [];

    console.log('Users:', users);

    users.forEach((user) => {
      let phone, address;
      switch (user.username) {
        case 'john_doe':
          phone = '123-456-7890';
          address = '123 Elm Street';
          break;
        case 'jane_smith':
          phone = '234-567-8901';
          address = '456 Oak Street';
          break;
        case 'william_brown':
          phone = '345-678-9012';
          address = '789 Pine Street';
          break;
        case 'emma_johnson':
          phone = '456-789-0123';
          address = '101 Maple Avenue';
          break;
        case 'liam_wilson':
          phone = '567-890-1234';
          address = '202 Birch Road';
          break;
        default:
          phone = '000-000-0000';
          address = 'Unknown Address';
      }

      contacts.push({
        contactid: uuidv4(),
        userid: user.userid,
        phone: phone,
        address: address,
        city: 'SampleCity',
        country: 'SampleCountry',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    try{
      await queryInterface.bulkInsert('contacts', contacts, {});
    

    }
    catch (error) {
      console.error('Error in seeder: ', error);
    }

   
  },

  down: async (queryInterface, Sequelize) => {
    
    try {
      await queryInterface.bulkDelete('contacts', null, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  }
};
