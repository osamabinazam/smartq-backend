'use strict';
const { v4: uuidv4 } = require('uuid');
const db = require('../models'); // Ensure correct import from models
const VendorProfileModel = require('../models/VendorProfile');
const LocationModel = require('../models/Location');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const VendorProfile = VendorProfileModel(db.sequelize);
    const Location = LocationModel(db.sequelize);

    try {
      const vendorProfiles = await VendorProfile.findAll();
      const locations = [];

      vendorProfiles.forEach((vendor) => {
        const locationData = [
          {
            address: '123 Elm Street',
            city: 'SampleCity',
            state: 'SampleState',
            postalcode: '12345',
            longitude: -73.935242,
            latitude: 40.730610,
            geolocation: Sequelize.fn('ST_GeomFromText', 'POINT(-73.935242 40.730610)', 4326),
          },
          {
            address: '456 Oak Street',
            city: 'ExampleCity',
            state: 'ExampleState',
            postalcode: '67890',
            longitude: -74.005941,
            latitude: 40.712776,
            geolocation: Sequelize.fn('ST_GeomFromText', 'POINT(-74.005941 40.712776)', 4326),
          }
        ];

        locationData.forEach((location) => {
          locations.push({
            locationid: uuidv4(),
            address: location.address,
            city: location.city,
            state: location.state,
            postalcode: location.postalcode,
            longitude: location.longitude,
            latitude: location.latitude,
            geolocation: location.geolocation,
            vendorprofileid: vendor.vendorprofileid,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      });

      await queryInterface.bulkInsert('locations', locations, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('locations', null, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  }
};
