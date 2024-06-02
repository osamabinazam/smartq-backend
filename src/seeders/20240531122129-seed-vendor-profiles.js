'use strict';
const {v4: uuidv4} = require('uuid');
const db = require('../models');
const UserModel = require('../models/User');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const User = await UserModel(db.sequelize);
    try {
      const users = await User.findAll({where: {usertype: 'vendor'}});
      const vendorProfiles = [];

      users.forEach((user) => {
        let _companyname, _companyaddress, _companycity, _companycountry, _companyemail;
        switch (user.dataValues.username) {
          case 'john_doe':
            _companyname = 'John Doe Enterprises';
            _companyaddress = 'Finance';
            _companycity = 'Sample Bio';
            _companycountry = new Date(1999, 2, 3);
            _companyemail = '';
            break;
          case 'jane_smith':
            _companyname = 'Jane Smith Corporation';
            _companyaddress = 'Technology';
            _companycity = 'Sample Bio';
            _companycountry = new Date(1999, 3, 3);
            _companyemail = '';
            break;
          
          case 'william_brown':
            _companyname = 'William Brown Company';
            _companyaddress = 'Education';
            _companycity = 'Sample Bio';
            _companycountry = new Date(1999, 4, 3);
            _companyemail = '';
            break;

          default:
            _companyname = 'Unknown';
            _companyaddress = 'Unknown Address';
            _companycity = 'Unknown City';
            _companycountry = 'SampleCountry';
            _companyemail = '';

        }

        vendorProfiles.push({
          vendorprofileid: uuidv4(),
          businessname: _companyname,
          businesstype: _companyaddress,
          bio: _companycity,
          dob: _companycountry,
          createdAt: new Date(),
          updatedAt: new Date(),
          userid: user.userid,
        });

      });
      await queryInterface.bulkInsert('vendor_profiles', vendorProfiles, {});
    }
    catch (error) {
      console.error('Error in seeder: ', error);
    }

  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('vendor_profiles', null, {});
    }
    catch (error) {
      console.error('Error in seeder: ', error);
    }
  }
};
