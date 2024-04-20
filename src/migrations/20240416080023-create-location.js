'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      locationid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      state: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      postalcode: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
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
    await queryInterface.dropTable('locations');
  }
};
