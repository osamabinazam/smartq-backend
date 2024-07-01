const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig.js');
const setupAssociations = require('./associations/associations.js');
require('dotenv').config();

const db = {};

/**
 * Create a new Sequelize instance
 */
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, dbConfig);

/**
 * Initialize the database with models and associations
 */
// async function initializeDatabase() {
  try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');


    // Ensure PostGIS is set up
     sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;').then(() => {
        console.log('PostGIS extension enabled.');
      }).catch((error) => {
        console.error('Unable to enable PostGIS extension:', error);
      });
    console.log('PostGIS extension enabled.');

    const modelFiles = fs.readdirSync(__dirname)
      .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js'); // Get all model files

    for (const file of modelFiles) {
      const modelInit = require(path.join(__dirname, file)); // Import the model file
      
      if (typeof modelInit === 'function') {
        const model = modelInit(sequelize); // Invoke the function with the Sequelize instance
        db[model.name + "Model"] = model;
      }
    }
    setupAssociations(db); // Setup model associations
     sequelize.sync({ force: false,
       alter: false }); // Sync all models with the database
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

db.sequelize = sequelize;
db.Sequelize = Sequelize;


/**
 * Export the db object
 */
module.exports = db;
