const RequestService = require('../services/RequestService');

/**
 * Create Request 
 * @param {Object} req - Express request object
 */
const createRequest = async (req, res) => {
    // Check body
    if (!req.body) {
        return res.status(400).json({ error: "Request body cannot be empty." });
    }

    try {
        const request = await RequestService.createRequest(req.body);
        return res.status(201).json(request);
    } catch (error) {
        console.error("Error creating request:", error);
        return res.status(500).json({ error: "Failed to create request." });
    }
}

/**
 * Get Request by ID
 * @param {Object} req - Express request object
 */
const getRequestById = async (req, res) => {
    // Check body
    if (!req.body) {
        return res.status(400).json({ error: "Request body cannot be empty." });
    }

    try {
        const request = await RequestService.getRequestById(req.body.requestid);
        return res.status(200).json(request);
    } catch (error) {
        console.error("Error fetching request:", error);
        return res.status(500).json({ error: "Failed to fetch request." });
    }
}

/**
 * Get all requests
 * @param {Object} req - Express request object
 */
const getAllRequest = async (req, res) => {
    try {
        const requests = await RequestService.getAllRequest();
        return res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching requests:", error);
        return res.status(500).json({ error: "Failed to fetch requests." });
    }
}

/**
 * delte Request
 */
const deleteRequest = async (req, res) => {
    // Check body
    if (!req.body) {
        return res.status(400).json({ error: "Request body cannot be empty." });
    }

    try {
        const request = await RequestService.deleteRequest(req.params.id);
        return res.status(200).json(request);
    } catch (error) {
        console.error("Error fetching request:", error);
        return res.status(500).json({ error: "Failed to fetch request." });
    }
}

/**
 * Get Request by QueueID
 */
const getRequestByQueueId = async (req, res) => {

    console.log("Request body", req.body.queueid)
    // Check body
    if (!req.body) {
        return res.status(400).json({ error: "Request body cannot be empty." });
    }

    try {
        const request = await RequestService.getRequestsByQueueId(req.body.queueid);
        return res.status(200).json(request);
    } catch (error) {
        console.error("Error fetching request:", error);
        return res.status(500).json({ error: "Failed to fetch request." });
    }
}

module.exports = {
    createRequest,
    getRequestById,
    getAllRequest,
    getRequestByQueueId,
    deleteRequest
};