const db = require('../models/index.js');

const QueueModel = db.QueueModel;

/**
 * Create a new Queue
 * @param {Object} queue - Queue object
 * @returns {Object} - The created Queue object
 * @throws {Error} - Throws error if the operation fails
 */
const createQueue = async (queue) => {
    try {
        return await QueueModel.create(queue);
    } catch (error) {
        console.error("Error creating queue:", error);
        throw new Error("Failed to create queue.");
    }
}

/**
 * Get Queue by ID
 * @param {number} queueId - Queue ID
 * @returns {Object} - The Queue object
 * @throws {Error} - Throws error if the operation fails
 */
const getQueueById = async (queueId) => {
    try {
        return await QueueModel.findByPk(queueId);
    } catch (error) {
        console.error("Error fetching queue:", error);
        throw new Error("Failed to fetch queue.");
    }
}

/**
 * Update Queue by ID
 * @param {number} queueId - Queue ID
 * @param {Object} queueDetails - Queue details to update
 * @returns {Object} - The updated Queue object
 * @throws {Error} - Throws error if the operation fails
 */
const updateQueue = async (queueId, queueDetails) => {
    try {
        const [updatedRows] = await QueueModel.update(queueDetails, { where: { queueid: queueId } });
        if (updatedRows === 0) {
            throw new Error("Queue not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating queue:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

/**
 * Delete Queue by ID
 * @param {number} queueId - Queue ID
 * @returns {number} - The number of deleted rows
 * @throws {Error} - Throws error if the operation fails
 */
const deleteQueue = async (queueId) => {
    try {
        return await QueueModel.destroy({ where: { queueid: queueId } });
    } catch (error) {
        console.error("Error deleting queue:", error);
        throw new Error("Failed to delete queue.");
    }
}

/**
 * Get Queue By Vendor ID and also include the appointments and services
 * @param {number} vendorId - Vendor ID
 * @returns {Object} - The Queue object
 * @throws {Error} - Throws error if the operation fails
 */
const getQueueByVendorId = async (vendorId) => {
    try {
        return await QueueModel.findOne({
            where: { vendorid: vendorId },
            order: [['createdAt', 'DESC']],
            include: [
                { model: db.AppointmentModel },
                { model: db.ServiceModel }
            ]
        });
    } catch (error) {
        console.error("Error fetching queue:", error);
        throw new Error("Failed to fetch queue.");
    }
}

/**
 * Get Queue By Customer ID and also include the appointments and services
 * @param {number} customerId - Customer ID
 * @returns {Object} - The Queue object
 * @throws {Error} - Throws error if the operation fails
 */
const getQueueByCustomerId = async (customerId) => {
    try {
        return await QueueModel.findOne({
            where: { customerid: customerId },
            order: [['createdAt', 'DESC']],
            include: [
                { model: db.AppointmentModel },
                { model: db.ServiceModel }
            ]
        });
    }
    catch (error) {
        console.error("Error fetching queue:", error);
        throw new Error("Failed to fetch queue.");
    }
}

/**
 * Get Queues By Queue Status
 * @param {string} queueStatus - Queue Status
 * @returns {Object} - The Queue object
 * @throws {Error} - Throws error if the operation fails
 */
const getQueuesByQueueStatus = async (queueStatus) => {
    try {
        return await QueueModel.findAll({ where: { status: queueStatus } });
    } catch (error) {
        console.error("Error fetching queue:", error);
        throw new Error("Failed to fetch queue.");
    }
}

module.exports = {
    createQueue,
    getQueueById,
    updateQueue,
    deleteQueue,
    getQueueByVendorId,
    getQueueByCustomerId,
    getQueuesByQueueStatus
};
