
const db = require('../models/index.js');

const CategoryModel = db.CategoryModel;

/**
 * Create a new Category    
 * @param {Object} category - Category object
 * @returns {Object} - The created Category object
 * @throws {Error} - Throws error if the operation fails
 */
const createCategory = async (category) => {
    try {
        return await CategoryModel.create(category);
    } catch (error) {
        console.error("Error creating category:", error);
        throw new Error("Failed to create category.");
    }
}

/**
 * Get Category by ID
 * @param {number} categoryId - Category ID
 * @returns {Object} - The Category object
 * @throws {Error} - Throws error if the operation fails
 */
const getCategoryById = async (categoryId) => {
    try {
        return await CategoryModel.findByPk(categoryId);
    } catch (error) {
        console.error("Error fetching category:", error);
        throw new Error("Failed to fetch category.");
    }
}

/**
 * Update Category by ID
 * @param {number} categoryId - Category ID
 * @param {Object} categoryDetails - Category details to update
 * @returns {Object} - The updated Category object
 * @throws {Error} - Throws error if the operation fails
 */

const updateCategory = async (categoryId, categoryDetails) => {
    try {
        const [updatedRows] = await CategoryModel.update(categoryDetails, { where: { categoryid: categoryId } });
        if (updatedRows === 0) {
            throw new Error("Category not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}


module.exports = {
    createCategory,
    getCategoryById,
    updateCategory
};