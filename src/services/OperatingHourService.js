const db = require("../models/index.js");

const OperatingHourModel = db.OperatingHourModel;

/**
 * Create a new OperatingHours
 * @param {Object} operatingHours - OperatingHours object
 * @returns {Object} - The created OperatingHours object
 * @throws {Error} - Throws error if the operation fails
 */
const createOperatingHours = async (operatingHours) => {
    try {
        return await OperatingHourModel.create(operatingHours);
    } catch (error) {
        console.error("Error creating operating hours:", error);
        throw new Error("Failed to create operating hours.");
    }
}

/**
 * Get OperatingHours by vendor Profile ID
 * @param {number} profileId - Profile ID
 * @returns {Object} - The OperatingHours object
 * @throws {Error} - Throws error if the operation fails
 */
const getOperatingHoursByProfileId = async (profileId) => {
    try {
        return await OperatingHourModel.findAll({ where: { vendorprofileid: profileId } });
    } catch (error) {
        console.error("Error fetching operating hours:", error);
        throw new Error("Failed to fetch operating hours.");
    }
}


/**
 * Update OperatingHours by ID
 * @param {number} operatingHoursId - OperatingHours ID
 * @param {Object} operatingHoursDetails - OperatingHours details to update
 * @returns {Object} - The updated OperatingHours object
 * @throws {Error} - Throws error if the operation fails
 */
const updateOperatingHours = async (operatingHoursId, operatingHoursDetails) => {
    try {
        const [updatedRows] = await OperatingHoursModel.update(operatingHoursDetails, { where: { operatinghoursid: operatingHoursId } });
        if (updatedRows === 0) {
            throw new Error("OperatingHours not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating operating hours:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

/**
 * Delete OperatingHours by ID
 * @param {number} operatingHoursId - OperatingHours ID
 * @returns {number} - The number of deleted rows
 * @throws {Error} - Throws error if the operation fails
 */
const deleteOperatingHours = async (operatingHoursId) => {

    console.log("Operating Hoors  id : ", operatingHoursId)
    try {
        return await OperatingHourModel.destroy({ where: { openinghoursid: operatingHoursId } });
    } catch (error) {
        console.error("Error deleting operating hours:", error);
        throw new Error("Failed to delete operating hours.");
    }
}

module.exports = { createOperatingHours, getOperatingHoursByProfileId, updateOperatingHours, deleteOperatingHours };
