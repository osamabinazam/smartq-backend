'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      categoryid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      categoryname: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      parentcategoryid: {
        type: DataTypes.UUID,
        references: {
          model: 'categories', // This is a reference to another table, making sure it's set correctly
          key: 'categoryid'
        },
        allowNull: true
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
    await queryInterface.dropTable('categories');
  }
};
