'use strict';

const  { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('queues', {
      queueID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      currentQueueSize: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      averageServiceTime: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      queueStartTime: {
        type: DataTypes.TIME,
        allowNull: true
      },
      queueEndTime: {
        type: DataTypes.TIME,
        allowNull: true
      },
      queueStatus: {
        type: DataTypes.ENUM('active', 'inactive', 'completed'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('queues');
  }
};
