'use strict';
const { v4: uuidv4 } = require('uuid');
const db = require('../models'); // Ensure correct import from models
const VendorProfileModel = require('../models/VendorProfile');
const SocialMediaModel = require('../models/SocialMedia');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const VendorProfile = VendorProfileModel(db.sequelize);
    const SocialMedia = SocialMediaModel(db.sequelize);
    
    try {
      const vendorProfiles = await VendorProfile.findAll();
      const socialMediaAccounts = [];

      vendorProfiles.forEach((vendor) => {
        const platforms = ['facebook', 'twitter', 'instagram', 'linkedIn', 'pinterest', 'youtube'];
        platforms.forEach((platform) => {
          socialMediaAccounts.push({
            socialmediaid: uuidv4(),
            link: `https://www.${platform}.com/${vendor.businessname.replace(/\s/g, '')}`,
            platform: platform,
            vendorprofileid: vendor.vendorprofileid,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      });

      await queryInterface.bulkInsert('social_media_accounts', socialMediaAccounts, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('social_media_accounts', null, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  }
};
