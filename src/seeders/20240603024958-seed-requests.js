'use strict';
const { v4: uuidv4 } = require('uuid');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const customers = await db.CustomerProfileModel.findAll();
      const vendors = await db.VendorProfileModel.findAll();
      const services = await db.ServiceModel.findAll();
      const categories = await db.CategoryModel.findAll();
      const locations = await db.LocationModel.findAll();
      const operatingHours = await db.OperatingHourModel.findAll();
      
      // Fetch active and future queues
      const activeQueues = await db.QueueModel.findAll({ where: { queueStatus: 'active' } });
      const futureQueues = await db.QueueModel.findAll({ where: { queueStatus: 'inactive' } });

      const requests = [];

      // Generate requests for active queues
      for (let i = 0; i < 10; i++) {
        const customer = customers[Math.floor(Math.random() * customers.length)];
        const vendor = vendors[Math.floor(Math.random() * vendors.length)];
        const service = services[Math.floor(Math.random() * services.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const operatingHour = operatingHours[Math.floor(Math.random() * operatingHours.length)];
        const queue = activeQueues[Math.floor(Math.random() * activeQueues.length)]; // Select a random active queue

        requests.push({
          requestID: uuidv4(),
          requestDateTime: new Date(),
          additionalNotes: 'Sample additional notes for active queue',
          customerprofileid: customer.customerprofileid,
          vendorprofileid: vendor.vendorprofileid,
          serviceid: service.serviceid,
          categoryid: category.categoryid,
          locationid: location.locationid,
          operatinghoursid: operatingHour.operatinghoursid,
          queueid: queue.queueID,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      // Generate requests for future queues
      for (let i = 0; i < 10; i++) {
        const customer = customers[Math.floor(Math.random() * customers.length)];
        const vendor = vendors[Math.floor(Math.random() * vendors.length)];
        const service = services[Math.floor(Math.random() * services.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const operatingHour = operatingHours[Math.floor(Math.random() * operatingHours.length)];
        const queue = futureQueues[Math.floor(Math.random() * futureQueues.length)]; // Select a random future queue

        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 10)); // Random future date

        requests.push({
          requestID: uuidv4(),
          requestDateTime: futureDate,
          additionalNotes: 'Sample additional notes for future queue',
          customerprofileid: customer.customerprofileid,
          vendorprofileid: vendor.vendorprofileid,
          serviceid: service.serviceid,
          categoryid: category.categoryid,
          locationid: location.locationid,
          operatinghoursid: operatingHour.operatinghoursid,
          queueid: queue.queueID,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      await queryInterface.bulkInsert('requests', requests, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('requests', null, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  }
};
