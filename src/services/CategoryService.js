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

/**
 * Delete Category by ID
 * @param {number} categoryId - Category ID
 * @returns {number} - The number of deleted rows
 * @throws {Error} - Throws error if the operation fails
 */
const deleteCategory = async (categoryId) => {
    try {
        const deletedRows = await CategoryModel.destroy({ where: { categoryid: categoryId } });
        if (deletedRows === 0) {
            throw new Error("Category not found.");
        }
        return deletedRows;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

/**
 * Get all Categories
 * @returns {Array} - Array of Category objects
 * @throws {Error} - Throws error if the operation fails
 */
const getAllCategories = async () => {
    try {
        return await CategoryModel.findAll();
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories.");
    }
}

/**
 * Get all subcategories of a Category
 * @param {number} categoryId - Category ID
 * @returns {Array} - Array of Category objects
 * @throws {Error} - Throws error if the operation fails
 */
const getSubcategoriesByCategoryId = async (categoryId) => {
    try {
        return await CategoryModel.findAll({ where: { parentcategoryid: categoryId } });
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        throw new Error("Failed to fetch subcategories.");
    }
}

/**
 * Get all Categories with their subcategories
 * @returns {Array} - Array of Category objects
 * @throws {Error} - Throws error if the operation fails
 * 
 */
const getAllCategoriesWithSubcategories = async () => {
    try {
        const categories = await CategoryModel.findAll();
        return categories.map(async (category) => {
            const subcategories = await getSubcategoriesByCategoryId(category.categoryid);
            return { ...category.dataValues, subcategories };
        });
    } catch (error) {
        console.error("Error fetching categories with subcategories:", error);
        throw new Error("Failed to fetch categories with subcategories.");
    }
}

/**
 * Get a subcategory by ID
 * @param {number} subcategoryId - Subcategory ID
 * @returns {Object} - The Subcategory object
 * @throws {Error} - Throws error if the operation fails
 */
const getSubcategoryById = async (subcategoryId) => {
    try {
        return await CategoryModel.findByPk(subcategoryId);
    } catch (error) {
        console.error("Error fetching subcategory:", error);
        throw new Error("Failed to fetch subcategory.");
    }
}

/**
 * Export the CategoryService module
 */
module.exports = {
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getSubcategoriesByCategoryId,
    getAllCategoriesWithSubcategories,
    getSubcategoryById
};
