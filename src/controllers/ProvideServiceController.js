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
        categoryid: req.body.categoryid,
      
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
 * Get all services based on userid
 */
const getVendorServices = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized. Please log in to view services." });
    }

    try {
        // Find related Vendor profile first
        const vendorProfile = await ProfileService.getVendorProfileByUserId(req.user.userid);

        if (!vendorProfile) {
            return res.status(404).json({ error: "Vendor profile not found." });
        }

        // Check if vendor services exist
        if (!vendorProfile.services || !vendorProfile.services.length) {
            return res.status(404).json({ error: "No services found for this vendor." });
        }

        // Extract services data
        const vendorServices = vendorProfile.services.map(service => service.dataValues);

        return res.status(200).json({
            services: vendorServices,
            message: "Services fetched successfully."
        });
        
    } catch (error) {
        console.error("Error fetching services:", error);
        return res.status(500).json({ error: "Failed to fetch services." });
    }
}



/**
 * export the createService function
 */
module.exports = {
    createService,
    getVendorServices
};