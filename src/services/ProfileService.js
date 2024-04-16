const db = require('../models/index.js');

const VendorProfileModel = db.VendorProfileModel;
const CustomerProfileModel = db.CustomerProfileModel;

/*********************************************************************************************
 * ************ Vendor Profile Services ******************************************************
 * ******************************************************************************************
 */

const createVendorProfile = async (vendorProfile) => {
    try {
        return await VendorProfileModel.create(vendorProfile);
    } catch (error) {
        console.error("Error creating vendor profile:", error);
        throw new Error("Failed to create vendor profile.");
    }
}

const getVendorProfileById = async (vendorProfileId) => {
    try {
        return await VendorProfileModel.findByPk(vendorProfileId);
    } catch (error) {
        console.error("Error fetching vendor profile:", error);
        throw new Error("Failed to fetch vendor profile.");
    }
}

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

const createCustomerProfile = async (customerProfile) => {
    try {
        return await CustomerProfileModel.create(customerProfile);
    } catch (error) {
        console.error("Error creating customer profile:", error);
        throw new Error("Failed to create customer profile.");
    }
}

const getCustomerProfileById = async (customerProfileId) => {
    try {
        return await CustomerProfileModel.findByPk(customerProfileId);
    } catch (error) {
        console.error("Error fetching customer profile:", error);
        throw new Error("Failed to fetch customer profile.");
    }
}

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

const getAllCustomerProfiles = async () => {
    try {
        return await CustomerProfileModel.findAll();
    } catch (error) {
        console.error("Error fetching customer profiles:", error);
        throw new Error("Failed to fetch customer profiles.");
    }
}

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

module.exports = {
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
