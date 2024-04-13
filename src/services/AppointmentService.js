import db from '../models/index.js';

const AppointmentModel = db.AppointmentModel;

/**
 * Create a new Appointment
 * @param {Object} appointment - Appointment object
 * @returns {Object} - The created Appointment object
 * @throws {Error} - Throws error if the operation fails
 */
const createAppointment = async (appointment) => {
    try {
        return await AppointmentModel.create(appointment);
    } catch (error) {
        console.error("Error creating appointment:", error);
        throw new Error("Failed to create appointment.");
    }
}

/**
 * Get Appointment by ID
 * @param {number} appointmentId - Appointment ID
 * @returns {Object} - The Appointment object
 * @throws {Error} - Throws error if the operation fails
 */
const getAppointmentById = async (appointmentId) => {
    try {
        return await AppointmentModel.findByPk(appointmentId,{
            include: [
                {
                    model: db.VendorProfileModel,
                    as: 'vendor'
                },
                {
                    model: db.CustomerProfileModel,
                    as: 'customer'
                },
                {
                    model: db.ServiceModel,
                    as: 'service'
                },{
                    model: db.QueueModel,
                    as: 'queue'
                }
            ]
        
        });
    } catch (error) {
        console.error("Error fetching appointment:", error);
        throw new Error("Failed to fetch appointment.");
    }
}

/**
 * Update Appointment by ID
 * @param {number} appointmentId - Appointment ID
 * @param {Object} appointmentDetails - Appointment details to update
 * @returns {Object} - The updated Appointment object
 * @throws {Error} - Throws error if the operation fails
 */
const updateAppointment = async (appointmentId, appointmentDetails) => {
    try {
        const [updatedRows] = await AppointmentModel.update(appointmentDetails, { where: { appointmentid: appointmentId } },{
            include: [
                {
                    model: db.VendorProfileModel,
                    as: 'vendor'
                },
                {
                    model: db.CustomerProfileModel,
                    as: 'customer'
                },
                {
                    model: db.ServiceModel,
                    as: 'service'
                },{
                    model: db.QueueModel,
                    as: 'queue'
                }
            ]
        });
        if (updatedRows === 0) {
            throw new Error("Appointment not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating appointment:", error);
        throw error; // Re-throw the error for the caller to handle
    }
    
}

/**
 * Delete Appointment by ID
 * @param {number} appointmentId - Appointment ID
 * @returns {number} - The number of deleted rows
 * @throws {Error} - Throws error if the operation fails
 */
const deleteAppointment = async (appointmentId) => {
    try {
        return await AppointmentModel.destroy({ where: { appointmentid: appointmentId } }, {
            include: [
                {
                    model: db.VendorProfileModel,
                    as: 'vendor'
                },
                {
                    model: db.CustomerProfileModel,
                    as: 'customer'
                },
                {
                    model: db.ServiceModel,
                    as: 'service'
                },{
                    model: db.QueueModel,
                    as: 'queue'
                }
            ]
        
        });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        throw new Error("Failed to delete appointment.");
    }
}

/**
 * Get appointments by vendor ID
 * @param {number} vendorId - Vendor ID
 * @returns {Object} - The Appointment object
 * @throws {Error} - Throws error if the operation fails
 */
const getAppointmentsByVendorId = async (vendorId) => {
    try {
        return await AppointmentModel.findAll({ where: { vendorid: vendorId } },
            {
                include: [
                    {
                        model: db.VendorProfileModel,
                        as: 'vendor'
                    },
                    {
                        model: db.CustomerProfileModel,
                        as: 'customer'
                    },
                    {
                        model: db.ServiceModel,
                        as: 'service'
                    },{
                        model: db.QueueModel,
                        as: 'queue'
                    }
                ]
            });
    } catch (error) {
        console.error("Error fetching appointment:", error);
        throw new Error("Failed to fetch appointment.");
    }
}

/**
 * Get appointments by customer ID
 * @param {number} customerId - Customer ID
 * @returns {Object} - The Appointment object
 * @throws {Error} - Throws error if the operation fails
 */
const getAppointmentsByCustomerId = async (customerId) => {
    try {
        return await AppointmentModel.findAll({ where: { customerid: customerId } },
            {
                include: [
                    {
                        model: db.VendorProfileModel,
                        as: 'vendor'
                    },
                    {
                        model: db.CustomerProfileModel,
                        as: 'customer'
                    },
                    {
                        model: db.ServiceModel,
                        as: 'service'
                    },{
                        model: db.QueueModel,
                        as: 'queue'
                    }
                ]
            });
    } catch (error) {
        console.error("Error fetching appointment:", error);
        throw new Error("Failed to fetch appointment.");
    }
}

/**
 * Get appointments by queue ID
 * @param {number} queueId - Queue ID
 * @returns {Object} - The Appointment object
 * @throws {Error} - Throws error if the operation fails
 */
const getAppointmentsByQueueId = async (queueId) => {
    try {
        return await AppointmentModel.findAll({ where: { queueid: queueId } },
            {
                include: [
                    {
                        model: db.VendorProfileModel,
                        as: 'vendor'
                    },
                    {
                        model: db.CustomerProfileModel,
                        as: 'customer'
                    },
                    {
                        model: db.ServiceModel,
                        as: 'service'
                    },{
                        model: db.QueueModel,
                        as: 'queue'
                    }
                ]
            });
    } catch (error) {
        console.error("Error fetching appointment:", error);
        throw new Error("Failed to fetch appointment.");
    }
}

/**
 * Get appointments by service ID
 * @param {number} serviceId - Service ID
 * @returns {Object} - The Appointment object
 * @throws {Error} - Throws error if the operation fails
 */
const getAppointmentsByServiceId = async (serviceId) => {
    try {
        return await AppointmentModel.findAll({ where: { serviceid: serviceId } },
            {
                include: [
                    {
                        model: db.VendorProfileModel,
                        as: 'vendor'
                    },
                    {
                        model: db.CustomerProfileModel,
                        as: 'customer'
                    },
                    {
                        model: db.ServiceModel,
                        as: 'service'
                    },{
                        model: db.QueueModel,
                        as: 'queue'
                    }
                ]
            });
    } catch (error) {
        console.error("Error fetching appointment:", error);
        throw new Error("Failed to fetch appointment.");
    }
}

export {
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByVendorId,
    getAppointmentsByCustomerId,
    getAppointmentsByQueueId,
    getAppointmentsByServiceId
    
};