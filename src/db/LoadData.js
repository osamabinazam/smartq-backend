const { Sequelize } = require('sequelize');
const config = require('../config/config.json');
const categoriesData = require('../utils/mock data/mockCategories');
const CategoryModel = require('../models/Category');

// Initialize Sequelize with your configuration
const sequelize = new Sequelize(config.development);

// Initialize the Category model
const Category = CategoryModel(sequelize);

// Function to insert categories into the database
async function insertCategories() {
    try {
        // Synchronize the model with the database
        await sequelize.sync();

        // Bulk create categories
        const createdCategories = await Category.bulkCreate(categoriesData, {
            validate: true,
            individualHooks: true
        });

        console.log(`Inserted ${createdCategories.length} categories successfully.`);
    } catch (error) {
        console.error('Error inserting categories:', error);
    } finally {
        // Close the Sequelize connection
        await sequelize.close();
    }
}

// Execute insertCategories function
// insertCategories();

module.exports = insertCategories;
