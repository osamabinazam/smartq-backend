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

      categories.forEach((category) => {
        const serviceData = [
          {
            name: `${category.categoryname} Consultation`,
            description: `Consultation services for ${category.categoryname.toLowerCase()}.`,
            price: 100.00
          },
          {
            name: `${category.categoryname} Training`,
            description: `Training services in ${category.categoryname.toLowerCase()}.`,
            price: 200.00
          }
        ];

        serviceData.forEach((service) => {
          const serviceId = uuidv4();
          services.push({
            serviceid: serviceId,
            name: service.name,
            description: service.description,
            price: service.price,
            categoryid: category.categoryid,
            createdAt: new Date(),
            updatedAt: new Date()
          });

          // Associate each service with a random vendor
          const randomVendor = vendors[Math.floor(Math.random() * vendors.length)];
          vendorServices.push({
            vendorprofileid: randomVendor.vendorprofileid,
            serviceid: serviceId,
            createdAt: new Date(),
            updatedAt: new Date()
          });
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
