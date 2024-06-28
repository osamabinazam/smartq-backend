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

    // Get the vendor profile ID Using the userID
    const vendorProfile = await ProfileService.getVendorProfileByUserId(req.user.userid);

    // Check if the vendor profile is not found
    if (!vendorProfile) {
        return res.status(404).json({ error: "Vendor profile not found." });
    }

    const categoryid = req.body.categoryid;

    // console.log("Vendor Profile : ", vendorProfile)
    // // Check whether the service exists or not before creating new service
    // const serviceExists = await ProvideService.checkServiceExists(vendorProfile.vendorprofileid, categoryid);

    // if (serviceExists) {
    //     return res.status(400).json({ error: "Service already exists for this vendor." });
    // }



    

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
 * Update a service
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - The updated service object
 * @throws {Error} - Throws error if the operation fails
 */
const updateService = async (req, res) => {
    // Check if the request body is empty
    if (!req.body) {
        return res.status(400).json({ error: "Request body cannot be empty." });
    }

    // Check if the request body is not an object
    if (typeof req.body !== 'object') {
        return res.status(400).json({ error: "Request body must be an object." });
    }

    // Get the service ID from the request parameters
    const serviceId = req.params.id;

    // Create a new Service object
    const serviceDetails = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryid: req.body.categoryid,
    };

    try {
        const updatedService = await ProvideService.updateService(serviceId, serviceDetails);
        return res.status(200).json(updatedService);
    } catch (error) {
        console.error("Error updating service:", error);
        return res.status(500).json({ error: "Failed to update service." });
    }
}

/**
 * delete a service
 * @param {Object} req - Express request object
 */
const deleteService = async (req, res) => {
    // Get the service ID from the request parameters
    const serviceId = req.params.id;

    console.log("Service ID : ", serviceId)

    try {
        const deletedService = await ProvideService.deleteService(serviceId);
        return res.status(200).json(deletedService);
    } catch (error) {
        console.error("Error deleting service:", error);
        return res.status(500).json({ error: "Failed to delete service." });
    }
}

/**
 * export the createService function
 */
module.exports = {
    createService,
    getVendorServices,
    updateService,
    deleteService
};