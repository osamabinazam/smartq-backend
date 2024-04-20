'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('customer_profiles', {
      customerprofileid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      firstname: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      emailaddress: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      dateofbirth: {
        type: DataTypes.DATEONLY,
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
    await queryInterface.dropTable('customer_profiles');
  }
};
