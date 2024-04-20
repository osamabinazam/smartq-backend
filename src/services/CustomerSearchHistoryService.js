
const db = require('../models/index.js');

const CustomerSearchHistoryModel = db.CustomerSearchHistoryModel;

/**
 * Create a new CustomerSearchHistory  
 * @param {Object} searchHistory - CustomerSearchHistory object
 * @returns {Object} - The created CustomerSearchHistory object
 * @throws {Error} - Throws error if the operation fails
 */
const createSearchHistory = async (searchHistory) => {
    try {
        return await CustomerSearchHistoryModel.create(searchHistory);
    } catch (error) {
        console.error("Error creating search history:", error);
        throw new Error("Failed to create search history.");
    }
}

/**
 * Get CustomerSearchHistory by ID
 * @param {number} searchHistoryId - CustomerSearchHistory ID
 * @returns {Object} - The CustomerSearchHistory object
 * @throws {Error} - Throws error if the operation fails
 */
const getSearchHistoryById = async (searchHistoryId) => {
    try {
        return await CustomerSearchHistoryModel.findByPk(searchHistoryId);
    } catch (error) {
        console.error("Error fetching search history:", error);
        throw new Error("Failed to fetch search history.");
    }
}

/**
 * Update CustomerSearchHistory by ID
 * @param {number} searchHistoryId - CustomerSearchHistory ID
 * @param {Object} searchHistoryDetails - CustomerSearchHistory details to update
 * @returns {Object} - The updated CustomerSearchHistory object
 * @throws {Error} - Throws error if the operation fails
 */
const updateSearchHistory = async (searchHistoryId, searchHistoryDetails) => {
    try {
        const [updatedRows] = await CustomerSearchHistoryModel.update(searchHistoryDetails, { where: { searchhistoryid: searchHistoryId } });
        if (updatedRows === 0) {
            throw new Error("CustomerSearchHistory not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating search history:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

/**
 * Delete CustomerSearchHistory by ID
 * @param {number} searchHistoryId - CustomerSearchHistory ID
 * @returns {number} - The number of deleted rows
 * @throws {Error} - Throws error if the operation fails
 */
const deleteSearchHistory = async (searchHistoryId) => {
    try {
        return await CustomerSearchHistoryModel.destroy({ where: { searchhistoryid: searchHistoryId } });
    } catch (error) {
        console.error("Error deleting search history:", error);
        throw new Error("Failed to delete search history.");
    }
}

module.exports = {
    createSearchHistory,
    getSearchHistoryById,
    updateSearchHistory,
    deleteSearchHistory
};ß