const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig.js');
const setupAssociations = require('./associations/associations.js');

const db = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, dbConfig);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const modelFiles = fs.readdirSync(__dirname)
      .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js');

    for (const file of modelFiles) {
      console.log("File is : ", file)
      const modelInit = require(path.join(__dirname, file)); // Import the model initialization function
      if (typeof modelInit === 'function') {
        const model = modelInit(sequelize); // Invoke the function with the Sequelize instance
        db[model.name+"Model"] = model;
      }
    }

    console.log("Database db is : ", db);

    setupAssociations(db); // Assuming associations are set up correctly in this file

    await sequelize.sync({ force: true, alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

initializeDatabase();

module.exports = db;
