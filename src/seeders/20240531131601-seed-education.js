'use strict';
const { v4: uuidv4 } = require('uuid');
const db = require('../models'); // Ensure correct import from models
const VendorProfileModel = require('../models/VendorProfile');
const EducationModel = require('../models/Education');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const VendorProfile = VendorProfileModel(db.sequelize);
    const Education = EducationModel(db.sequelize);

    try {
      const vendorProfiles = await VendorProfile.findAll();
      const educations = [];

      vendorProfiles.forEach((vendor) => {
        const educationData = [
          {
            school: 'Sample University',
            degree: 'Bachelor of Science',
            startAt: '2010-09-01',
            endAt: '2014-05-31',
            description: 'Studied computer science with a focus on software development.'
          },
          {
            school: 'Example College',
            degree: 'Master of Business Administration',
            startAt: '2015-09-01',
            endAt: '2017-05-31',
            description: 'Specialized in business management and entrepreneurship.'
          }
        ];

        educationData.forEach((education) => {
          educations.push({
            educationid: uuidv4(),
            school: education.school,
            degree: education.degree,
            startAt: education.startAt,
            endAt: education.endAt,
            description: education.description,
            vendorprofileid: vendor.vendorprofileid,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      });

      await queryInterface.bulkInsert('educations', educations, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('educations', null, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  }
};
