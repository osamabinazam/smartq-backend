
import db from '../models/index.js';

const LocationModel = db.LocationModel;
const VendorProfileModel = db.VendorProfileModel;


/**
 * Create a new Location
 * @param {Object} location - Location object
 * @returns {Object} - The created Location object
 * @throws {Error} - Throws error if the operation fails
 */
const createLocation = async (location) => {
    try {
        return await LocationModel.create(location);
    } catch (error) {
        console.error("Error creating location:", error);
        throw new Error("Failed to create location.");
    }
}

/**
 * Get Location by ID
 * @param {number} locationId - Location ID
 * @returns {Object} - The Location object
 * @throws {Error} - Throws error if the operation fails
 */
const getLocationById = async (locationId) => {
    try {
        return await LocationModel.findByPk(locationId);
    } catch (error) {
        console.error("Error fetching location:", error);
        throw new Error("Failed to fetch location.");
    }
}

/**
 * Update Location by ID
 * @param {number} locationId - Location ID
 * @param {Object} locationDetails - Location details to update
 * @returns {Object} - The updated Location object
 * @throws {Error} - Throws error if the operation fails
 */

const updateLocation = async (locationId, locationDetails) => {
    try {
        const [updatedRows] = await LocationModel.update(locationDetails, { where: { locationid: locationId } });
        if (updatedRows === 0) {
            throw new Error("Location not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating location:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

/**
 * Delete Location by ID
 * @param {number} locationId - Location ID
 * @returns {number} - The number of deleted rows
 * @throws {Error} - Throws error if the operation fails
 */
const deleteLocation = async (locationId) => {
    try {
        const deletedRows = await LocationModel.destroy({ where: { locationid: locationId } });
        if (deletedRows === 0) {
            throw new Error("Location not found.");
        }
        return deletedRows;
    } catch (error) {
        console.error("Error deleting location:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}   

/**
 * Get all Locations
 * @returns {Array} - Array of Location objects
 * @throws {Error} - Throws error if the operation fails
 */
const getAllLocations = async () => {
    try {
        return await LocationModel.findAll();
    } catch (error) {
        console.error("Error fetching locations:", error);
        throw new Error("Failed to fetch locations.");
    }
}

/**
 * Get all Locations by Vendor Profile ID
 * @param {number} vendorProfileId - Vendor Profile ID
 * @returns {Array} - Array of Location objects
 * @throws {Error} - Throws error if the operation fails
 */
const getLocationsByVendorProfileId = async (vendorProfileId) => {
    try {
        return await LocationModel.findAll({ where: { vendorprofileid: vendorProfileId } });
    } catch (error) {
        console.error("Error fetching locations:", error);
        throw new Error("Failed to fetch locations.");
    }
}


export default { 
    createLocation, 
    getLocationById, 
    updateLocation, 
    deleteLocation, 
    getAllLocations 
};
