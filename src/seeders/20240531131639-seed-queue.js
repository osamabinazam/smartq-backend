'use strict';
const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const VendorProfileModel = require('../models/VendorProfile');
const ServiceModel = require('../models/Service');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const VendorProfile = db.VendorProfileModel;
    const Service = db.ServiceModel;

    try {
      const vendors = await VendorProfile.findAll({
        include: ['services']
      });

      const queues = [];

      vendors.forEach((vendor) => {
        const service = vendor.services[0]; // Assuming each vendor has one service
        const now = new Date();
        const activeQueue = {
          queueID: uuidv4(),
          currentQueueSize: 0,
          averageServiceTime: 0,
          queueStartTime: now,
          queueEndTime: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
          queueStatus: 'active',
          serviceid: service.serviceid,
          vendorprofileid: vendor.vendorprofileid,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        queues.push(activeQueue);

        for (let i = 0; i < 5; i++) {
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + (i + 1)); // Upcoming queue
          queues.push({
            queueID: uuidv4(),
            currentQueueSize: Math.floor(Math.random() * 10),
            averageServiceTime: 0,
            queueStartTime: futureDate,
            queueEndTime: new Date(futureDate.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
            queueStatus: 'inactive',
            serviceid: service.serviceid,
            vendorprofileid: vendor.vendorprofileid,
            createdAt: new Date(),
            updatedAt: new Date()
          });

          const pastDate = new Date();
          pastDate.setDate(pastDate.getDate() - (i + 1)); // Completed queue
          queues.push({
            queueID: uuidv4(),
            currentQueueSize: 20,
            averageServiceTime: 300,
            queueStartTime: pastDate,
            queueEndTime: new Date(pastDate.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
            queueStatus: 'completed',
            serviceid: service.serviceid,
            vendorprofileid: vendor.vendorprofileid,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      });

      await queryInterface.bulkInsert('queues', queues, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('queues', null, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  }
};
