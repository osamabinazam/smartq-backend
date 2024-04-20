
const db = require('../models/index.js');

const CustomerSearchPreferenceModel = db.CustomerSearchPreferenceModel;

/**
 * Create a new CustomerSearchPreference
 * @param {Object} customerSearchPreference - CustomerSearchPreference object
 * @returns {Object} - The created CustomerSearchPreference object
 * @throws {Error} - Throws error if the operation fails
 */ 
const createCustomerSearchPreference = async (customerSearchPreference) => {
    try {
        return await CustomerSearchPreferenceModel.create(customerSearchPreference);
    } catch (error) {
        console.error("Error creating customer search preference:", error);
        throw new Error("Failed to create customer search preference.");
    }
}

/**
 * Get CustomerSearchPreference by ID
 * @param {number} customerSearchPreferenceId - CustomerSearchPreference ID
 * @returns {Object} - The CustomerSearchPreference object
 * @throws {Error} - Throws error if the operation fails
 */

const getCustomerSearchPreferenceById = async (customerSearchPreferenceId) => {
    try {
        return await CustomerSearchPreferenceModel.findByPk(customerSearchPreferenceId);
    } catch (error) {
        console.error("Error fetching customer search preference:", error);
        throw new Error("Failed to fetch customer search preference.");
    }
}

/**
 * Update CustomerSearchPreference by ID
 * @param {number} customerSearchPreferenceId - CustomerSearchPreference ID
 * @param {Object} customerSearchPreferenceDetails - CustomerSearchPreference details to update
 * @returns {Object} - The updated CustomerSearchPreference object
 * @throws {Error} - Throws error if the operation fails
 */

const updateCustomerSearchPreference = async (customerSearchPreferenceId, customerSearchPreferenceDetails) => {
    try {
        const [updatedRows] = await CustomerSearchPreferenceModel.update(customerSearchPreferenceDetails, { where: { customersearchpreferenceid: customerSearchPreferenceId } });
        if (updatedRows === 0) {
            throw new Error("CustomerSearchPreference not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating customer search preference:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

module.exports = {
    createCustomerSearchPreference,
    getCustomerSearchPreferenceById,
    updateCustomerSearchPreference
};



// Path: src/services/Locatio