import db from './src/models/index.js';

const User = db.UserModel;
const Vendor = db.VendorModel;
const Customer = db.CustomerModel;


/******************************************* Create Profile Controllers ********************************** */

/**
 * Create a new Vendor Profile 
 * @param {Object} req - Request object 
 * @param {Object} res - Response object 
 * @returns 
 */
const createVendorProfile = async (req, res) => {
    console.log(res.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    res.send("Vendor Profile Created Successfully");
}


/**
 * Create a new Customer Profile 
 * @param {Object} req - Request object 
 * @param {Object} res - Response object 
 * @returns 
 */
const createCustomerProfile = async (req, res) => {
    console.log(res.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    res.send("Customer Profile Created Successfully");
}


/************************************** Get Profile Innformation Controllers ****************************** */

/**
 * Get the Vendor Profile Information
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} res - Response object
 * 
 */

const getVendorProfile = async (req, res) => {
    console.log(res.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    res.send("Vendor Profile Information");
}


/**
 * Get the Customer Profile Information
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} res - Response object
 */

const getCustomerProfile = async (req, res) => {
    console.log(res.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    res.send("Customer Profile Information");
}

/**
 * Get all the Vendor Profiles
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} res - Response object
 */

const getAllVendorProfiles = async (req, res) => {
    console.log(res.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    res.send("All Vendor Profiles");
}


/**
 * Get all the Customer Profiles
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} res - Response object
 */

const getAllCustomerProfiles = async (req, res) => {
    console.log(res.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    res.send("All Customer Profiles");
}


/**
 * Get all the Profiles
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} res - Response object
 */

const getAllProfiles = async (req, res) => {
    console.log(res.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    res.send("All Profiles");
}









/******************************************* Update Profile Controllers ********************************** */

/**
 * Update the Vendor Profile
 * @param {Object} req - Request object 
 * @param {Object} res - Response object 
 * @returns 
 */
const updateVendorProfile = async (req, res) => {
    console.log(res.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    res.send("Vendor Profile Updated Successfully");
}


/**
 * Update the Customer Profile
 * @param {Object} req - Request object 
 * @param {Object} res - Response object 
 * @returns 
 */
const updateCustomerProfile = async (req, res) => {
    console.log(res.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    res.send("Customer Profile Updated Successfully");
}



/******************************************* Delete Profile Controllers ********************************** */

/**
 * Delete the Vendor Profile
 * @param {Object} req - Request object 
 * @param {Object} res - Response object 
 * @returns 
 */
const deleteVendorProfile = async (req, res) => {
    console.log(res.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    res.send("Vendor Profile Deleted Successfully");
}


/**
 * Delete the Customer Profile
 * @param {Object} req - Request object 
 * @param {Object} res - Response object 
 * @returns 
 */

const deleteCustomerProfile = async (req, res) => {
    console.log(res.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    res.send("Customer Profile Deleted Successfully");
}



/**
 * Export controller functions as a module 
 */
export default { 
    createVendorProfile, 
    updateVendorProfile, 
    deleteVendorProfile, 
    createCustomerProfile, 
    updateCustomerProfile, 
    deleteCustomerProfile 
};
