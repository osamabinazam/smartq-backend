'use strict';
const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const CategoryModel = require('../models/Category');
const VendorProfileModel = require('../models/VendorProfile');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Category = CategoryModel(db.sequelize);
    const VendorProfile = VendorProfileModel(db.sequelize);

    try {
      const categories = await Category.findAll();
      const vendors = await VendorProfile.findAll();
      const services = [];
      const vendorServices = [];

      vendors.forEach((vendor) => {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const serviceId = uuidv4();
        const service = {
          serviceid: serviceId,
          name: `${category.categoryname} Service`,
          description: `Service related to ${category.categoryname}`,
          price: 100.00,
          categoryid: category.categoryid,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        services.push(service);

        vendorServices.push({
          vendorprofileid: vendor.vendorprofileid,
          serviceid: serviceId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });

      await queryInterface.bulkInsert('services', services, {});
      await queryInterface.bulkInsert('VendorService', vendorServices, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('VendorService', null, {});
      await queryInterface.bulkDelete('services', null, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  }
};
