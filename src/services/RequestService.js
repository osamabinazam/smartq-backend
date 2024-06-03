const db = require('../models/index.js');
const RequestModel = db.RequestModel;
const ServiceModel = db.ServiceModel;
const CategoryModel = db.CategoryModel;
const LocationModel = db.LocationModel;
const OperatingHourModel = db.OperatingHourModel;
const QueueModel = db.QueueModel;
const CustomerProfileModel = db.CustomerProfileModel;
const VendorProfileModel = db.VendorProfileModel;

// Create Request
const createRequest = async (request) => {
    try {
        return await RequestModel.create(request, {
            include: [
                'service' ,
               'category' ,
                'location',
                'operatingHours' ,
                'queue',
               'customer_profile',
                 'vendor_profile'
            ]
        });
    } catch (error) {
        console.error("Error creating request:", error);
        throw new Error("Failed to create request.");
    }
}

// Get Request by ID
const getRequestById = async (requestId) => {
    try {
        return await RequestModel.findByPk(requestId, {
            include: [
                'service' ,
               'category' ,
                'location',
                'operatingHours' ,
                'queue',
               'customer_profile',
                 'vendor_profile'
            ]
        });
    } catch (error) {
        console.error("Error fetching request:", error);
        throw new Error("Failed to fetch request.");
    }
}

// get all request
const getAllRequest = async () => {
    try {
        return await RequestModel.findAll({
            include: [
                'service' ,
               'category' ,
                'location',
                'operatingHours' ,
                'queue',
               'customer_profile',
                 'vendor_profile'
            ]
        });
    } catch (error) {
        console.error("Error fetching request:", error);
        throw new Error("Failed to fetch request.");
    }
}

// Update Request by ID
const updateRequest = async (requestId, requestDetails) => {
    try {
        const [updatedRows] = await RequestModel.update(requestDetails, { where: { requestID: requestId } });
        if (updatedRows === 0) {
            throw new Error("Request not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating request:", error);
        throw new Error("Failed to update request.");
    }
}

// Delete Request by ID
const deleteRequest = async (requestId) => {
    try {
        const deletedRows = await RequestModel.destroy({ where: { requestID: requestId } });
        if (deletedRows === 0) {
            throw new Error("Request not found.");
        }
        return deletedRows;
    } catch (error) {
        console.error("Error deleting request:", error);
        throw new Error("Failed to delete request.");
    }
}

// Get Requests by queueID
const getRequestsByQueueId = async (queueId) => {
    try {
        return await RequestModel.findAll({ 
            where: { queueid: queueId } ,
            include: [
                'service' ,
               'category' ,
                'location',
                'operatingHours' ,
                'queue',
               'customer_profile',
                 'vendor_profile'
            ]
        });
    } catch (error) {
        console.error("Error fetching request:", error);
        throw new Error("Failed to fetch request.");
    }
}

module.exports = {
    createRequest,
    getRequestById,
    updateRequest,
    deleteRequest,
    getAllRequest,
    getRequestsByQueueId
};
