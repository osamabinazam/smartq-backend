import db from '../models/index.js';

const VendorProfileModel = db.VendorProfileModel;
const CustomerProfileModel = db.CustomerProfileModel;


/*********************************************************************************************
 * ************ Vendor Profile Services ******************************************************
 * ******************************************************************************************
 */

/**
 * Create a new Vendor Profile
 * @param {Object} vendorProfile - Vendor Profile object
 * @returns {Object} - The created Vendor Profile object
 * @throws {Error} - Throws error if the operation fails
 */

const createVendorProfile = async (vendorProfile) => {
    try {
        return await VendorProfileModel.create(vendorProfile);
    } catch (error) {
        console.error("Error creating vendor profile:", error);
        throw new Error("Failed to create vendor profile.");
    }
}

/**
 * Get Vendor Profile by ID
 * @param {number} vendorProfileId - Vendor Profile ID
 * @returns {Object} - The Vendor Profile object
 * @throws {Error} - Throws error if the operation fails
 */
const getVendorProfileById = async (vendorProfileId) => {

    // try{
    //     vendorProfileId = UserModel.findAll({where: {userid: vendorProfileId}}).vendorProfileId;
    //  }catch(error){
    //      console.error("No User found with given ID", error);
    //      throw new Error("No User found with given ID");
    //  }

    try {
        return await VendorProfileModel.findByPk(vendorProfileId);
    } catch (error) {
        console.error("Error fetching vendor profile:", error);
        throw new Error("Failed to fetch vendor profile.");
    }
}


/**
 * Update Vendor Profile by ID
 * @param {number} vendorProfileId - Vendor Profile ID
 * @param {Object} vendorProfileDetails - Vendor Profile details to update
 * @returns {Object} - The updated Vendor Profile object
 * @throws {Error} - Throws error if the operation fails
 */
const updateVendorProfile = async (vendorProfileId, vendorProfileDetails) => {
    try {
        const [updatedRows] = await VendorProfileModel.update(vendorProfileDetails, { where: { vendorprofileid: vendorProfileId } });
        if (updatedRows === 0) {
            throw new Error("Vendor Profile not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating vendor profile:", error);
        throw error;
    }
}

/**
 * Delete Vendor Profile by ID
 * @param {number} vendorProfileId - Vendor Profile ID
 * @returns {number} - The number of deleted rows
 * @throws {Error} - Throws error if the operation fails
 */
const deleteVendorProfile = async (vendorProfileId) => {
    try {
        const deletedRows = await VendorProfileModel.destroy({ where: { vendorprofileid: vendorProfileId } });
        if (deletedRows === 0) {
            throw new Error("Vendor Profile not found.");
        }
        return deletedRows;
    } catch (error) {
        console.error("Error deleting vendor profile:", error);
        throw error;
    }
}

/**
 * Get all Vendor Profiles
 * @returns {Array} - Array of Vendor Profile objects
 * @throws {Error} - Throws error if the operation fails
*/
const getAllVendorProfiles = async () => {
    try {
        return await VendorProfileModel.findAll();
    } catch (error) {
        console.error("Error fetching vendor profiles:", error);
        throw new Error("Failed to fetch vendor profiles.");
    }
}






/********************************************************************************************
 * ************ Customer Profile Services ***************************************************
 * ******************************************************************************************
 */

/**
 * Create a new Customer Profile
 * @param {Object} customerProfile - Customer Profile object
 * @returns {Object} - The created Customer Profile object
 * @throws {Error} - Throws error if the operation fails
 */

const createCustomerProfile = async (customerProfile) => {

    try {
        return await CustomerProfileModel.create(customerProfile);
    } catch (error) {
        console.error("Error creating customer profile:", error);
        throw new Error("Failed to create customer profile.");
    }
}

/**
 * Get Customer Profile by ID
 * @param {number} customerProfileId - Customer Profile ID
 * @returns {Object} - The Customer Profile object
 * @throws {Error} - Throws error if the operation fails
 */
const getCustomerProfileById = async (customerProfileId) => {
    try {
        return await CustomerProfileModel.findByPk(customerProfileId);
    } catch (error) {
        console.error("Error fetching customer profile:", error);
        throw new Error("Failed to fetch customer profile.");
    }
}

/**
 * Update Customer Profile by ID
 * @param {number} customerProfileId - Customer Profile ID
 * @param {Object} customerProfileDetails - Customer Profile details to update
 * @returns {Object} - The updated Customer Profile object
 */
const updateCustomerProfile = async (customerProfileId, customerProfileDetails) => {
    try {
        const [updatedRows] = await CustomerProfileModel.update(customerProfileDetails, { where: { customerprofileid: customerProfileId } });
        if (updatedRows === 0) {
            throw new Error("Customer Profile not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating customer profile:", error);
        throw error;
    }
}

/**
 * Delete Customer Profile by ID
 * @param {number} customerProfileId - Customer Profile ID
 * @returns {number} - The number of deleted rows
 */
const deleteCustomerProfile = async (customerProfileId) => {
    try {
        const deletedRows = await CustomerProfileModel.destroy({ where: { customerprofileid: customerProfileId } });
        if (deletedRows === 0) {
            throw new Error("Customer Profile not found.");
        }
        return deletedRows;
    } catch (error) {
        console.error("Error deleting customer profile:", error);
        throw error;
    }
}

/**
 * Get all Customer Profiles
 * @returns {Array} - Array of Customer Profile objects
 */
const getAllCustomerProfiles = async () => {
    try {
        return await CustomerProfileModel.findAll();
    } catch (error) {
        console.error("Error fetching customer profiles:", error);
        throw new Error("Failed to fetch customer profiles.");
    }
}


/**
 * Get Vendor Profile by User ID
 * @param {number} userId - User ID
 * @returns {Object} - The Vendor Profile object
 * @throws {Error} - Throws error if the operation fails
 */
const getVendorProfileByUserId = async (userId) => {
    try {
        return await VendorProfileModel.findOne({ where: { userid: userId } });
    } catch (error) {
        console.error("Error fetching vendor profile:", error);
        throw new Error("Failed to fetch vendor profile.");
    }
}

/********************************************************************************************
 * ************ Export Profile Services ******************************************************
 * ******************************************************************************************
 */

export default { 
    createVendorProfile, 
    getVendorProfileById,
    updateVendorProfile,
    deleteVendorProfile,
    getAllVendorProfiles,
    getVendorProfileByUserId,
    createCustomerProfile,
    getCustomerProfileById,
    updateCustomerProfile,
    deleteCustomerProfile,
    getAllCustomerProfiles

 };