'use strict';
const { v4: uuidv4 } = require('uuid');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const customers = await db.CustomerProfileModel.findAll();
      const vendors = await db.VendorProfileModel.findAll();
      const services = await db.ServiceModel.findAll();
      const queues = await db.QueueModel.findAll();

      const appointments = [];

      for (let i = 0; i < 20; i++) {
        const customer = customers[Math.floor(Math.random() * customers.length)];
        const vendor = vendors[Math.floor(Math.random() * vendors.length)];
        const service = services[Math.floor(Math.random() * services.length)];
        const queue = queues[Math.floor(Math.random() * queues.length)];

        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 10)); // Random future date

        appointments.push({
          appointmentID: uuidv4(),
          appointmentDateTime: futureDate,
          startTime: null,
          endTime: null,
          appointmentStatus: 'scheduled',
          customerprofileid: customer.customerprofileid,
          vendorprofileid: vendor.vendorprofileid,
          serviceid: service.serviceid,
          queueid: queue.queueID,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      await queryInterface.bulkInsert('appointments', appointments, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('appointments', null, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  }
};
