const QueueService = require('../services/QueueService');
const ProfileService = require('../services/ProfileService');
const ProvideService = require('../services/ProvideService');
const nodeSchedule = require('node-schedule');

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
    const vendorProfile = await ProfileService.getVendorProfileByUserId(req.user.userid);
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
        const createQueue = await QueueService.createQueue(req.body);

        
        nodeSchedule.scheduleJob(createQueue.queueStartTime, async function () {
            try {
                await QueueService.updateQueueStatus(createQueue.queueID, 'active');
                console.log('Queue activated:', createQueue.queueID);
            } catch (error) {
                console.error('Error activating queue:', error);
            }
        });
        return res.status(201).json(createQueue);
    } catch (error) {
        console.error("Error creating queue:", error);
        return res.status(500).json({ error: "Failed to create queue." });
    }
}

/**
 * Get Queue by Vendor ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - The Queue object
 */
const getQueueByVendorId = async (req, res) => {
    // Check body
    if (!req.body) {
        return res.status(400).json({ error: "Request body cannot be empty." });
    }


    try {
        const vendorProfile = await ProfileService.getVendorProfileByUserId(req.user.userid);
        if (!vendorProfile) {
            return res.status(404).json({ error: "Vendor profile not found." });
        }

        const queue = await QueueService.getQueueByVendorId(vendorProfile.vendorprofileid);
        
        console.log(queue)
        
        return res.status(200).json(queue);
    } catch (error) {
        console.error("Error fetching queue:", error);
        return res.status(500).json({ error: "Failed to fetch queue." });
    }
}


/**
 * Get Future Queues
 * @param {Object} req - Express request object
 */
const getFutureQueues = async (req, res) => {
    try {
        const queues = await QueueService.getQueuesByVendorProfile();
        return res.status(200).json(queues);
    } catch (error) {
        console.error("Error fetching queues:", error);
        return res.status(500).json({ error: "Failed to fetch queues." });
    }
}

/**
 * exports the createQueue function
 * @exports createQueue
 */

module.exports = {
    createQueue,
    getQueueByVendorId
};