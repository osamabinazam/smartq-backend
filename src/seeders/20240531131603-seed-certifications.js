'use strict';
const { v4: uuidv4 } = require('uuid');
const db = require('../models'); // Ensure correct import from models
const VendorProfileModel = require('../models/VendorProfile');
const CertificateModel = require('../models/Certificate');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const VendorProfile = VendorProfileModel(db.sequelize);
    const Certificate = CertificateModel(db.sequelize);

    try {
      const vendorProfiles = await VendorProfile.findAll();
      const certificates = [];

      vendorProfiles.forEach((vendor) => {
        const certificateData = [
          {
            title: 'Certified Project Manager',
            college: 'Project Management Institute',
            start_date: '2018-01-01',
            end_date: '2018-12-31',
            certificate_url: 'https://example.com/certificates/cpm',
            image_url: 'https://example.com/images/cpm.png'
          },
          {
            title: 'Certified Data Scientist',
            college: 'Data Science Academy',
            start_date: '2019-01-01',
            end_date: '2019-12-31',
            certificate_url: 'https://example.com/certificates/cds',
            image_url: 'https://example.com/images/cds.png'
          }
        ];

        certificateData.forEach((certificate) => {
          certificates.push({
            certificateid: uuidv4(),
            title: certificate.title,
            college: certificate.college,
            start_date: certificate.start_date,
            end_date: certificate.end_date,
            certificate_url: certificate.certificate_url,
            image_url: certificate.image_url,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      });

      await queryInterface.bulkInsert('certificates', certificates, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('certificates', null, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  }
};
