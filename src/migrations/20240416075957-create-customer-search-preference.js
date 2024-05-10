'use strict';
const  { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('customer_search_preferences', {
      preferenceID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      searchRadius: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      preferredCategories: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      preferredPriceRange: {
        type: DataTypes.NUMERIC,
        allowNull: true
      },
      preferredRating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: true
      },
      lastSearch: {
        type: DataTypes.DATE,
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
    await queryInterface.dropTable('customer_search_preferences');
  }
};
