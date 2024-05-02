
const CategoryService = require('../services/CategoryService.js');


/**
 * Create a new Category
 * @param {object} req
 * @param {object} res
 * @returns {object} - The created Category object
 */
const createCategory = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: 'No category data found in the request.',
        });
    }

    if (!req.body.categoryname) {
        return res.status(400).json({
            message: 'Category name is required',
        });
    }

    const categoryData = {
        categoryname: req.body.categoryname,
    };

    try {
        if (req.body.parentcategoryid) {
            categoryData.parentcategoryid = req.body.parentcategoryid;
        }

        const category = await CategoryService.createCategory(categoryData);
        return res.status(201).json(category);
    } catch (error) {
        console.error('Failed to create category:', error);
        return res.status(500).json({
            message: 'Failed to create category',
            error: error.message,
        });
    }
}



/**
 * Get All Categories
 * @param {object} req
 * @param {object} res
 * @returns {object} - The list of Categories
 */
const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();
        return res.status(200).json(categories);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return res.status(500).json({
            message: 'Failed to fetch categories',
            error: error.message,
        });
    }
}

/**
 * Get Category by ID
 * @param {object} req
 * @param {object} res
 * @returns {object} - The Category object
 */
const getCategoryById = async (req, res) => {
    if (!req.params.categoryId) {
        return res.status(400).json({
            message: 'Category ID is required',
        });
    }

    try {
        const category = await CategoryService.getCategoryById(req.params.categoryId);
        return res.status(200).json(category);
    } catch (error) {
        console.error('Failed to fetch category:', error);
        return res.status(500).json({
            message: 'Failed to fetch category',
            error: error.message,
        });
    }
}

/**
 * Update Category by ID
 * @param {object} req
 * @param {object} res
 * @returns {object} - The updated Category object
 */
const updateCategory = async (req, res) => {
    if (!req.params.categoryId) {
        return res.status(400).json({
            message: 'Category ID is required',
        });
    }

    if (!req.body) {
        return res.status(400).json({
            message: 'No category data found in the request.',
        });
    }

    const categoryDetails = {
        categoryname: req.body.categoryname,
        // description: req.body.description,
    };

    try {
        const updatedCategory = await CategoryService.updateCategory(req.params.categoryId, categoryDetails);
        return res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Failed to update category:', error);
        return res.status(500).json({
            message: 'Failed to update category',
            error: error.message,
        });
    }
}

/**
 * Delete Category by ID
 * @param {object} req
 * @param {object} res
 * @returns {object} - The number of deleted rows
 */
const deleteCategory = async (req, res) => {
    if (!req.params.categoryId) {
        return res.status(400).json({
            message: 'Category ID is required',
        });
    }

    try {
        const deletedRows = await CategoryService.deleteCategory(req.params.categoryId);
        return res.status(200).json({
            message: 'Category deleted successfully',
            deletedRows,
        });
    } catch (error) {
        console.error('Failed to delete category:', error);
        return res.status(500).json({
            message: 'Failed to delete category',
            error: error.message,
        });
    }
}

module.exports = {
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getAllCategories
};
// Path: src/services/CategoryService.js