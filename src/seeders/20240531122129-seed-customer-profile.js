'use strict';
const { v4: uuidv4 } = require('uuid');
const db = require('../models'); // Ensure correct import from models
const UserModel = require('../models/User')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const User = await UserModel(db.sequelize)
    try {
      const users = await User.findAll({ where: { usertype: 'customer' } });
      const customerProfiles = [];

      
      users.forEach((user) => {
        let _firstname, _lastname, _dateofbirth , _emailaddress;
        console.log("Users :", user.dataValues.username)
        switch (user.dataValues.username) {
          
          case 'emma_johnson':
            _firstname= "Emma ";
            _lastname ="johnson";
            _emailaddress= "a@example.com"
            _dateofbirth= new Date(1999, 2, 3);
            break;

          case 'liam_wilson':
            _firstname= "Liam";
            _lastname="Wilson";
            _emailaddress= "b@example.com"
            _dateofbirth= new Date(1999, 3, 3);
            break;

          default:
            _firstname = 'Unknown';
            _lastname = "unknown";
            _emailaddress ="c@example.com"
            _dateofbirth = new Date(1990, 1, 1);

        }

        customerProfiles.push({
          customerprofileid: uuidv4(),
          userid: user.userid,
          firstname: _firstname,
          lastname:_lastname,
          dateofbirth: _dateofbirth,
          emailaddress: _emailaddress,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });



      await queryInterface.bulkInsert('customer_profiles', customerProfiles, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('customer_profiles', null, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  }
};
