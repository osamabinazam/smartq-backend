const { Sequelize } = require('sequelize');
const config = require('../config/config.json');


// Initialize Sequelize with your configuration
const sequelize = new Sequelize(config.development);

// Drop all tables
async function dropAllTables() {
  try {
    const queryInterface = sequelize.getQueryInterface();
    const tableNames = await queryInterface.showAllTables();

    // Drop each table with CASCADE option
    for (const tableName of tableNames) {
      await queryInterface.dropTable(tableName, { cascade: true });
      console.log(`Table '${tableName}' dropped successfully.`);
    }
    console.log('All tables dropped successfully.');
  } catch (error) {
    console.error('Error dropping tables:', error);
  } finally {
    // Close the Sequelize connection
    await sequelize.close();
  }
}

// Execute dropAllTables function
dropAllTables();
