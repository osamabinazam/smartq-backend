'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'other')
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      lastlogin: {
        type: DataTypes.DATE,
        defaultValue: null
      },
      usertype: {
        type: DataTypes.ENUM('vendor', 'customer', 'admin'),
        defaultValue: 'customer'
      },
      isactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
