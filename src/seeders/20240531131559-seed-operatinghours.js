'use strict';
const { v4: uuidv4 } = require('uuid');
const db = require('../models'); // Ensure correct import from models
const VendorProfileModel = require('../models/VendorProfile');
const OperatingHourModel = require('../models/OperatingHour');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const VendorProfile = VendorProfileModel(db.sequelize);
    const OperatingHour = OperatingHourModel(db.sequelize);
    
    try {
      const vendorProfiles = await VendorProfile.findAll();
      const operatingHours = [];

      vendorProfiles.forEach((vendor) => {
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        weekdays.forEach((day) => {
          operatingHours.push({
            openinghoursid: uuidv4(),
            weekday: day,
            opentime: '09:00:00',
            closetime: '17:00:00',
            isclosed: false,
            vendorprofileid: vendor.vendorprofileid,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      });

      await queryInterface.bulkInsert('opening_hours', operatingHours, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('opening_hours', null, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  }
};
