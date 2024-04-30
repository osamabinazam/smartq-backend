const db = require('../models/index.js');
const ProfileService = require('./ProfileService.js');


const Category = db.CategoryModel;
const Service = db.ServiceModel;
const Location = db.LocationModel;


/**
 * Create a vendor's Service along with the category and location
 * @param {object} serviceData
 * @returns {object} - The created Service object
 * @throws {Error} - Throws error if the operation fails
 * @example
 */

const createService = async (serviceData, vendorProfileId, categoryid) => {
    try {
        const category = await Category.findByPk(categoryid);
        if (!category) {
            throw new Error("Category not found.");
        }

        // const location = await Location.findByPk(serviceData.locationid);
        // if (!location) {
        //     throw new Error("Location not found.");
        // }

        console.log("Service Data : ", serviceData)
        const vendorService = await  Service.create(serviceData);

        // Associate with Category
        // await vendorService.addCategory(category);
        
        // Associate with Locationn
        // vendorService.addLocation(location);

        // Associate with VendorProfile
        const vendorProfile = await ProfileService.getVendorProfileById(vendorProfileId);
        if (!vendorProfile) {
            throw new Error("Vendor Profile not found.");
        }
        await vendorProfile.addService(vendorService);

        return vendorService;

       

    } catch (error) {
        console.error("Error creating service:", error);
        throw new Error("Failed to create service.");
    }
}

// Need Changes 

/**
 * Get Service by ID
 * @param {number} serviceId - Service ID
 * @returns {object} - The Service object
 * @throws {Error} - Throws error if the operation fails
 */

const getServiceById = async (serviceId) => {
    try {
        return await Service.findByPk(serviceId);
    } catch (error) {
        console.error("Error fetching service:", error);
        throw new Error("Failed to fetch service.");
    }
}

/**
 * Get all Services
 * @returns {Array} - Array of Service objects
 * @throws {Error} - Throws error if the operation fails
 */

const getAllServices = async () => {
    try {
        return await Service.findAll();
    } catch (error) {
        console.error("Error fetching services:", error);
        throw new Error("Failed to fetch services.");
    }
}

/**
 * Get Service(s) by category ID
 * @param {number} categoryId - Category ID
 * @returns {Array} - Array of Service objects
 * @throws {Error} - Throws error if the operation fails
 */

const getServicesByCategory = async (categoryId) => {
    try {
        return await Service.findAll({ where: { categoryid: categoryId } });
    } catch (error) {
        console.error("Error fetching services:", error);
        throw new Error("Failed to fetch services.");
    }
}


/**
 * Update Service by ID
 * @param {number} serviceId - Service ID
 * @param {object} serviceDetails - Service details to update
 * @returns {object} - The updated Service object
 * @throws {Error} - Throws error if the operation fails
 */

const updateService = async (serviceId, serviceDetails) => {
    try {
        const [updatedRows] = await Service.update(serviceDetails, { where: { serviceid: serviceId } });
        if (updatedRows === 0) {
            throw new Error("Service not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating service:", error);
        throw error;
    }
}

/**
 * Delete Service by ID
 * @param {number} serviceId - Service ID
 * @returns {number} - The number of deleted rows
 * @throws {Error} - Throws error if the operation fails
 */

const deleteService = async (serviceId) => {
    try {
        const deletedRows = await Service.destroy({ where: { serviceid: serviceId } });
        if (deletedRows === 0) {
            throw new Error("Service not found.");
        }
        return deletedRows;
    } catch (error) {
        console.error("Error deleting service:", error);
        throw error;
    }
}

/**
 * Expport the functions
 */
module.exports = {
    createService,
    getServiceById,
    getAllServices,
    getServicesByCategory,
    updateService,
    deleteService
};
