const db = require('../models/index.js');
const AppointmentService = require('./AppointmentService.js');

const QueueModel = db.QueueModel;

/**
 * Create a new Queue
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
 */
const getQueueById = async (queueId) => {
    try {
        return await QueueModel.findByPk(queueId, {
            include: 'appointments'
        });
    } catch (error) {
        console.error("Error fetching queue:", error);
        throw new Error("Failed to fetch queue.");
    }
}

/**
 * Update Queue by ID
 */


const updateQueue = async (queueId, queueDetails) => {
    try {
        const [updatedRows] = await QueueModel.update(queueDetails, { where: { queueID: queueId } });
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
 * Update queue status
 */
const updateQueueStatus = async (queueId, status) => {
    try {
        const [updatedRows] = await QueueModel.update({ status: status }, { where: { queueID: queueId } });
        if (updatedRows === 0) {
            throw new Error("Queue not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating queue status:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}




/**
 * Delete Queue by ID

 */
const deleteQueue = async (queueId) => {
    try {
        return await QueueModel.destroy({
            where: { queueid: queueId },
            include: [AppointmentModel]
        });
    } catch (error) {
        console.error("Error deleting queue:", error);
        throw new Error("Failed to delete queue.");
    }
}



/**
 * Get Queue By Vendor ID and also include the appointments and services

 */
const getQueueByVendorId = async (vendorId) => {
    try {

        console.log("Vendor is Is : ", vendorId)
        const queueData = await QueueModel.findOne({
            where: { vendorprofileid: vendorId, queueStatus:'active'}, 
            order: [['createdAt', 'DESC']],
            include: ['appointments', 'services']
        });

        console.log("queue Data is  :  " , queueData)

        const noOfRemaingAppointments = await AppointmentService.getNumberOfAppointmentsInQueueByStatus(queueData.queueID, 'scheduled');

        queueData.dataValues['remaing'] = await noOfRemaingAppointments;

        return queueData;
    } catch (error) {
        console.error("Error fetching queue:", error);
        throw new Error("Failed to fetch queue.");
    }
}



/**
 * Get Queues By Vendor Profile

 */
const getQueuesByVendorProfile = async (vendorProfile) => {
    try {
        return await QueueModel.findAll({
            where: { vendorprofile: vendorProfile },
            order: [['createdAt', 'DESC']],
            include: [
                'appointments',
                'services'
            ]
        });
    } catch (error) {
        console.error("Error fetching queue:", error);
        throw new Error("Failed to fetch queue.");
    }
}



/**
 * Get Queue In the range of start time and end time

 */
const getQueueByTimeRange = async (startTime, endTime) => {
    try {
        return await QueueModel.findAll({
            where: { starttime: startTime, endtime: endTime },
            order: [['createdAt', 'DESC']],
            include: [
                'appointments',
                'services'
            ]
        });
    } catch (error) {
        console.error("Error fetching queue:", error);
        throw new Error("Failed to fetch queue.");
    }
}


/**
 * Get Queues By Queue Status (active, inactive, full, etc)
 */
const getQueuesByQueueStatus = async (queueStatus, vid) => {
    try {

        return await QueueModel.findAll({
            where: { queueStatus: queueStatus, vendorprofileid:vid},
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: db.AppointmentModel,
                    as: 'appointments',
                    include: [
                        {
                            model: db.CustomerProfileModel,
                            as: 'customer_profile'
                        },
                        {
                            model: db.ServiceModel,
                            as: 'service'
                        }
                    ]
                },
                {
                    model: db.ServiceModel,
                    as: 'services'
                }
            ]
        });
    } catch (error) {
        console.error("Error fetching queue:", error);
        throw new Error("Failed to fetch queue.");
    }
}

/**
 * Get comming Queues By Queue Status (active, inactive, full, etc)
 */
const getCommingQueuesByQueueStatus = async (queueStatus) => {
    try {
        return await QueueModel.findAll({
            where: { queueStatus: queueStatus },
            order: [['createdAt', 'DESC']],
            include: [ 'appointments', 'services']
        });
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
    getQueuesByQueueStatus,
    getQueuesByVendorProfile,
    getQueueByTimeRange,
    updateQueueStatus,
    getCommingQueuesByQueueStatus
};
