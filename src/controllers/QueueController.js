const QueueService = require('../services/QueueService');
const VendorProfileService = require('../services/VendorProfileService');
const ProvideService = require('../services/ProvideService');

/**
 * Create a new Queue
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - The created Queue object
 * @throws {Error} - Throws error if the operation fails
 */
const createQueue = async (req, res) => {

    // Check if the request body is empty
    if (!req.body) {
        return res.status(400).json({ error: "Request body cannot be empty." });
    }

    // Check if the request body is not an object
    if (typeof req.body !== 'object') {
        return res.status(400).json({ error: "Request body must be an object." });
    }

    // Get the vendor profile ID Using the userID
    const vendorProfile = await VendorProfileService.getVendorProfileByUserId(req.user.id);
    console.log("Vendoe Profile Is : ", vendorProfile);
    // Check if the vendor profile is not found
    if (!vendorProfile) {
        return res.status(404).json({ error: "Vendor profile not found." });
    }


    // Create a new Queue object
    const queue = {
        currentQueueSize: req.body.queueSize,
        averageServiceTime: req.body.serviceTime,
        queueStartTime: req.body.startTime,
        queueEndTime: req.body.endTime,
        queueStatus: req.body.status,
        vendorprofileid: vendorProfile.vendorprofileid,
        serviceid: req.body.serviceId
    };


    try {
        const queue = await QueueService.createQueue(req.body);
        return res.status(201).json(queue);
    } catch (error) {
        console.error("Error creating queue:", error);
        return res.status(500).json({ error: "Failed to create queue." });
    }
}
