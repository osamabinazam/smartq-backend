const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig.js');
const setupAssociations = require('./associations/associations.js');

const db = {};

/**
 * Create a new Sequelize instance
 */
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, dbConfig);

/**
 * Initialize the database with models and associations
 * 
 */
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const modelFiles = fs.readdirSync(__dirname)                              // Read all files in the current directory
      .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js');   // Get all model files

    for (const file of modelFiles) {
      const modelInit = require(path.join(__dirname, file)); // Import the model file
      
      // Check if the modelInit is a function
      if (typeof modelInit === 'function') {
        const model = modelInit(sequelize); // Invoke the function with the Sequelize instance
        db[model.name + "Model"] = model;
      }
    }
    setupAssociations(db);      // Setup model associations
    db.sequelize = sequelize;   // Export the Sequelize instance
    db.Sequelize = Sequelize;   // Export Sequelize

    await sequelize.sync({ force: false, alter: true }); // Sync all models with the database (force: true will drop the tables)
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


initializeDatabase();         // Initialize the database

/**
 * Export the db object
 * 
 */
module.exports = db;
