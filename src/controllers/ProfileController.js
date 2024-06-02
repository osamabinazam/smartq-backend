const db = require('../models/index.js');
const ProfileService = require('../services/ProfileService.js');
const ContactService = require('../services/ContactService.js');
const axios = require('axios');

const User = db.UserModel;

/******************************************* Create Profile Controllers ********************************** */

/**
 * Create a new Vendor Profile 
 * @param {Object} req - Request object 
 * @param {Object} res - Response object 
 * @returns 
 */
const createVendorProfile = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    try {
        const Vendor = {

            businessname: req.body.businessname,
            businesstype: req.body.businesstype,
            bio: req.body.bio,
            dob: req.body.dob,
            userid: req.user.userid
        }
        try {

            try{
            const vendorProfile = await ProfileService.getVendorProfileByUserId(req.user.userid);
                if (vendorProfile) {
                    const updatedVendorProfile = await ProfileService.updateVendorProfile(vendorProfile.vendorprofileid, Vendor);
                    return res.status(200).send({updatedVendorProfile, message:"Successfully updated "});
                }

                else{
                    console.log("Vendor Profile does not exist")
                }
            
            }catch(error){
                console.error("Error fetching vendor profile:", error);
                return res.status(500).send({ message: 'Failed to fetch vendor profile.' });
            }

            const vendor = await ProfileService.createVendorProfile(Vendor);
            res.status(201).send({ vendor, message: "Vendor Profile Created Successfully" });
        }
        catch (error) {
            console.log("Encounter an error while creating vendor profile", error)
            res.status(500).send("Encounter an error while creating vendor profile");
        }
    }
    catch (error) {
        console.log("Error of not passing correct data", error)
        res.status(500).send("Error of not passing correct data");
    }
}


/**
 * Create a new Customer Profile 
 * @param {Object} req - Request object 
 * @param {Object} res - Response object 
 * @returns 
 */
const createCustomerProfile = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    try {
        const Customer = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            emailaddress:req.body.emailaddress,
            dateofbirth: req.body.dateofbirth,
            userid: req.user.userid
        }
        try {
            const customer = await ProfileService.createCustomerProfile(Customer);
            res.status(201).send({ customer, message: "Customer Profile Created Successfully" });
        }
        catch (error) {
            console.log("Encounter an error while creating customer profile", error)
            res.status(500).send("Encounter an error while creating customer profile");
        }
    }
    catch (error) {
        console.log("Error of not passing correct data", error)
        res.status(500).send("Error of not passing correct data");
    }
}


/************************************** Get Profile Innformation Controllers ****************************** */

/**
 * Get the Vendor Profile Information
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} res - Response object
 * 
 */

const getVendorProfileByUserId = async (req, res) => {
    
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const userId = req.user.userid;
    if (!userId) {
        return res.status(400).send({ message: 'User ID is required.' });
    }

    try {
        const vendorProfile = await ProfileService.getVendorProfileByUserId(userId);
        if (!vendorProfile) {
            return res.status(404).send({ message: 'Vendor Profile not found.' });
        }

        
        return res.status(200).send(vendorProfile);
    }
    catch (error) {
        console.error("Error fetching vendor profile:", error);
        return res.status(500).send({ message: 'Failed to fetch vendor profile.' });
    }
    
}

/**
 * Get the Vendor Profile Information
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} res - Response object
*/
const getVendorProfileById = async (req, res) => {
    console.log(res.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const vendorprofileid = req.params.id;
    if (!vendorprofileid) {
        return res.status(400).send({ message: 'Vendor ID is required.' });
    }

    try {
        const vendorProfile = await ProfileService.getVendorProfileById(vendorprofileid);
        if (!vendorProfile) {
            return res.status(404).send({ message: 'Vendor Profile not found.' });
        }
        return res.status(200).send(vendorProfile);
    }
    catch (error) {
        console.error("Error fetching vendor profile:", error);
        return res.status(500).send({ message: 'Failed to fetch vendor profile.' });
    }
}


/**
 * Get the Customer Profile Information
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} res - Response object
 */

const getCustomerProfileByUserId = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send({ message: 'User ID is required.' });
    }

    // Get Contact Detail 
    const contact = await ContactService.getContactByUserId(userId);


    try {
        const customerProfile = await ProfileService.getCustomerProfileById(userId);
        if (!customerProfile) {
            return res.status(404).send({ message: 'Customer Profile not found.' });
        }
        customerProfile.contact = contact;
        return res.status(200).send(customerProfile);
    }
    catch (error) {
        console.error("Error fetching customer profile:", error);
        return res.status(500).send({ message: 'Failed to fetch customer profile.' });
    }
}

/**
 * Get the Customer Profile Information
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} res - Response object
 */
const getCustomerProfileById = async (req, res) =>{
    
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const customerprofileid = req.params.id;
    if (!customerprofileid) {
        return res.status(400).send({ message: 'Customer ID is required.' });
    }

    try {
        const customerProfile = await ProfileService.getCustomerProfileById(customerprofileid);
        if (!customerProfile) {
            return res.status(404).send({ message: 'Customer Profile not found.' });
        }
        return res.status(200).send(customerProfile);
    }
    catch (error) {
        console.error("Error fetching customer profile:", error);
        return res.status(500).send({ message: 'Failed to fetch customer profile.' });
    }
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

    try {
        const vendorProfiles = await ProfileService.getAllVendorProfiles();
        res.status(200).send(vendorProfiles);
    }
    catch (error) {
        console.error("Error fetching vendor profiles:", error);
        return res.status(500).send({ message: 'Failed to fetch vendor profiles.' });
    }
}


/**
 * Get all the Customer Profiles
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} res - Response object
 */

const getAllCustomerProfiles = async (req, res) => {
  
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    try {
        const customerProfiles = await ProfileService.getAllCustomerProfiles();
        res.status(200).send(customerProfiles);
    }
    catch (error) {
        console.error("Error fetching customer profiles:", error);
        return res.status(500).send({ message: 'Failed to fetch customer profiles.' });
    }

}

/**
 * Get all the Profiles
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} res - Response object
 */

const getAllProfiles = async (req, res) => {
    
    try {
        const vendorProfiles = await ProfileService.getAllVendorProfiles();
        const customerProfiles = await ProfileService.getAllCustomerProfiles();
        res.status(200).send({ vendorProfiles, customerProfiles });
    }
    catch (error) {
        console.error("Error fetching profiles:", error);
        return res.status(500).send({ message: 'Failed to fetch profiles.' });
    }
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

    try{
        const vendorProfileId = req.params.id;
        const vendorProfileDetails = req.body;
        const updatedVendorProfile = await ProfileService.updateVendorProfile(vendorProfileId, vendorProfileDetails);
        return res.status(200).send({updatedVendorProfile, message:"Successfully updated "});
    
    }
    catch(error){
        console.error("Error updating vendor profile:", error);
        return res.status(500).send({ message: 'Failed to update vendor profile.' });
    }
}


/**
 * Update the Customer Profile
 * @param {Object} req - Request object 
 * @param {Object} res - Response object 
 * @returns 
 */
const updateCustomerProfile = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
   try {
        const customerProfileId = req.params.id;
        const customerProfileDetails = req.body;
        const updatedCustomerProfile = await ProfileService.updateCustomerProfile(customerProfileId, customerProfileDetails);
        return res.status(200).send({updatedCustomerProfile, message:"Successfully updated "}); // Added return here for consistency
    
    } catch (error) {
        console.error("Error updating customer profile:", error);
        return res.status(500).send({ message: 'Failed to update customer profile.' });
    }
}



/******************************************* Delete Profile Controllers ********************************** */

/**
 * Delete the Vendor Profile
 * @param {Object} req - Request object 
 * @param {Object} res - Response object 
 * @returns 
 */
const deleteVendorProfile = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const vendorProfileId = req.params.id;
    if (!vendorProfileId) {
        return res.status(400).send({ message: 'Vendor Profile ID is required.' });
    }

    try {
        const deletedVendorProfile = await ProfileService.deleteVendorProfile(vendorProfileId);
        if (deletedVendorProfile === 0) {
            return res.status(404).send({ message: 'Vendor Profile not found.' });
        }
        return res.status(200).send({ message: 'Vendor Profile deleted successfully.' });
    }
    catch (error) {
        console.error("Error deleting vendor profile:", error);
        return res.status(500).send({ message: 'Failed to delete vendor profile.' });
    }
}


/**
 * Delete the Customer Profile
 * @param {Object} req - Request object 
 * @param {Object} res - Response object 
 * @returns 
 */

const deleteCustomerProfile = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const customerprofileid = req.params.id;
    if (!customerprofileid) {
        return res.status(400).send({ message: 'Customer Profile ID is required.' });
    }

    try {
        const deletedCustomerProfile = await ProfileService.deleteCustomerProfile(customerprofileid);
        if (deletedCustomerProfile === 0) {
            return res.status(404).send({ message: 'Customer Profile not found.' });
        }
        return res.status(200).send({ message: 'Customer Profile deleted successfully.' });
    }
    catch (error) {
        console.error("Error deleting customer profile:", error);
        return res.status(500).send({ message: 'Failed to delete customer profile.' });
    }
}


/**
 * Get All nearby Vendors
 * 
 */
const getAllNearbyVendors = async (req, res) => {
    try {
        // Check if query parameters are present
        if (!req.query) {
            return res.status(400).send({
                message: "Query parameters cannot be empty!"
            });
        }

        const { latitude, longitude, radius } = req.query;

        // Validate query parameters
        if (!latitude || !longitude || !radius) {
            return res.status(400).json({
                message: "Missing required query parameters: latitude, longitude, radius.",
                details: {
                    message: "Missing required query parameters: latitude, longitude, radius.",
                    code: "InvalidInput"
                }
            });
        }

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        const rad = parseFloat(radius);

        // Ensure latitude, longitude, and radius are valid numbers
        if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
            return res.status(400).json({
                message: `Coordinate is invalid: ${latitude},${longitude}`,
                details: {
                    message: `Coordinate is invalid: ${latitude},${longitude}`,
                    code: "InvalidInput"
                }
            });
        }

        // Fetch nearby vendors from ProfileService
        const vendors = await ProfileService.getAllNearbyVendors(lat, lon, rad);

        // Check if vendors are found
        if (vendors.length === 0) {
            return res.status(200).json([]);
        }

        // Extract valid vendor locations
        const validVendors = vendors.filter(vendor =>
            vendor.dataValues.business_locations &&
            vendor.dataValues.business_locations.length > 0 &&
            !isNaN(vendor.dataValues.business_locations[0].latitude) &&
            !isNaN(vendor.dataValues.business_locations[0].longitude)
        );

        if (validVendors.length === 0) {
            return res.status(400).json({
                message: 'No vendors with valid coordinates found.',
                details: {
                    message: 'All retrieved vendors have invalid coordinates.',
                    code: 'InvalidCoordinates'
                }
            });
        }

        const mapboxToken = 'pk.eyJ1Ijoib3NhbWFiaW5hemFtIiwiYSI6ImNsd3hmOXZ0NjExZHYybnIzOTF5ZDhpYmwifQ.IZYJjsum8TR-ZXQWHJFehw';
        const origin = `${lon},${lat}`;
        const destinations = validVendors.map(vendor => {
            const location = vendor.dataValues.business_locations[0];
            return `${location.longitude},${location.latitude}`;
        }).join(';');

        const url = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${origin};${destinations}?access_token=${mapboxToken}`;

        // Fetch distance matrix from Mapbox
        const response = await axios.get(url);
        const matrix = response.data;

        // Extract distances and durations from matrix
        const distances = matrix.destinations.slice(1).map(destination => destination.distance);
        const durations = matrix.durations[0].slice(1); // Exclude the first duration (origin to itself)

        // Prepare results with distance and duration only for valid coordinates
        const results = validVendors.map((vendor, index) => {
            const location = vendor.dataValues.business_locations[0];
            return {
                vendorprofileid: vendor.dataValues.vendorprofileid,
                servicetitle: vendor.dataValues.services[0].name,
                servicedescription: vendor.dataValues.services[0].description,
                serviceprice: vendor.dataValues.services[0].price,
                name: vendor.dataValues.businessname,
                latitude: location.latitude,
                longitude: location.longitude,
                distance: distances[index],
                duration: durations[index] !== undefined ? durations[index] : 'N/A',
                operatinghours: {
                    opentime: vendor.dataValues.operating_hours[0].opentime,
                    closetime: vendor.dataValues.operating_hours[0].closetime,
                    isClosed: vendor.dataValues.operating_hours[0].isclosed
                }
            };
        });

        // Send results
        res.status(200).send({
            results: results,
            message: 'Successfully fetched nearby vendors.',
            response: matrix
        });
    } catch (error) {
        console.error("Error fetching nearby vendors:", error);

        // Determine the error type and send appropriate response
        if (error.isAxiosError && error.response) {
            // Handle Axios errors
            return res.status(error.response.status).send({
                message: error.response.data.message || 'Error fetching data from external API.',
                details: error.response.data
            });
        } else if (error instanceof Sequelize.ValidationError) {
            // Handle Sequelize validation errors
            return res.status(400).send({
                message: 'Database validation error.',
                details: error.errors.map(err => err.message)
            });
        } else {
            // Handle other types of errors
            return res.status(500).send({
                message: 'Internal server error.',
                details: error.message
            });
        }
    }
};







/**
 * Export controller functions as a module 
 */
module.exports = {
    createVendorProfile,
    createCustomerProfile,
    getVendorProfileByUserId,
    getCustomerProfileByUserId,
    getCustomerProfileById,
    getVendorProfileById,
    getAllVendorProfiles,
    getAllCustomerProfiles,
    getAllProfiles,
    updateVendorProfile,
    updateCustomerProfile,
    deleteVendorProfile,
    deleteCustomerProfile,
    getAllNearbyVendors
};
