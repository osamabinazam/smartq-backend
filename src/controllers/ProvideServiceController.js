const ProvideService = require('../services/ProvideService');
const ProfileService = require('../services/ProfileService');


/**
 * Create a service
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - The created service object
 * @throws {Error} - Throws error if the operation fails
 */

const createService = async (req, res) => {

    // Check if the request body is empty
    if (!req.body) {
        return res.status(400).json({ error: "Request body cannot be empty." });
    }

    // Check if the request body is not an object
    if (typeof req.body !== 'object') {
        return res.status(400).json({ error: "Request body must be an object." });

    }

    console.log("Requested User : ", req.user)
    // Get the vendor profile ID Using the userID
    const vendorProfile = await ProfileService.getVendorProfileByUserId(req.user.userid);

    // Check if the vendor profile is not found
    if (!vendorProfile) {
        return res.status(404).json({ error: "Vendor profile not found." });
    }

    const categoryid = req.body.categoryid;

    

    // Create a new Service object
    const serviceobj = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      
    };

    try {
        const service = await ProvideService.createService(serviceobj, vendorProfile.vendorprofileid,categoryid );
        return res.status(201).json(service);
    } catch (error) {
        console.error("Error creating service:", error);
        return res.status(500).json({ error: "Failed to create service." });
    }
}

/**
 * export the createService function
 */
module.exports = {
    createService
};