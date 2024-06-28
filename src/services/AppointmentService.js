const app = require('../config/serverConfig.js');
const db =  require('../models/index.js');

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

// /**
//  * Get Appointment by ID
//  * @param {number} appointmentId - Appointment ID
//  * @returns {Object} - The Appointment object
//  * @throws {Error} - Throws error if the operation fails
//  */
// const getAppointmentById = async (appointmentId) => {
//     try {
//         return await AppointmentModel.findByPk(appointmentId,{
//             include: [
//                 {
//                     model: db.ServiceModel,
//                     as: 'service',
//                     attributes: ['name', 'price'], // Include only name and price from Service
//                 },
//                 {
//                     model: db.CustomerProfileModel,
//                     as: 'customer_profile',
//                     // attributes: [], // Adjust attributes if needed or exclude all fields
//                 },
//                 {
//                     model: db.VendorProfileModel,
//                     as: 'vendor_profile',
//                     attributes: [ 'businessname', 'businesstype'], // Include only required fields from VendorProfile
//                 },
//                 {
//                     model: db.QueueModel,
//                     as: 'queue',
//                     attributes: ['queueID', 'currentQueueSize', 'averageServiceTime', 'queueStartTime', 'queueEndTime', 'queueStatus'], // Include all fields from Queue
//                     include: [
//                         {
//                             model: db.AppointmentModel,
//                             as: 'appointments',
//                             attributes: ['appointmentID', 'appointmentDateTime', 'startTime', 'endTime', 'appointmentStatus'], // Include necessary fields from Appointments
//                         },
//                     ],
//                 },
//             ],
//         });
//     } catch (error) {
//         console.error("Error fetching appointment:", error);
//         throw new Error("Failed to fetch appointment.");
//     }
// }
/**
 * Get Appointment by ID
 * @param {number} appointmentId - Appointment ID
 * @returns {Object} - The Appointment object
 * @throws {Error} - Throws error if the operation fails
 */
const getAppointmentById = async (appointmentId) => {
    try {
        const appointment = await db.AppointmentModel.findByPk(appointmentId, {
            include: [
                {
                    model: db.ServiceModel,
                    as: 'service',
                    attributes: ['name', 'price'], // Include only name and price from Service
                },
                {
                    model: db.VendorProfileModel,
                    as: 'vendor_profile',
                    attributes: [ 'businessname', 'businesstype'], // Include only required fields from VendorProfile
                },
                {
                    model: db.QueueModel,
                    as: 'queue',
                    attributes: ['queueID', 'currentQueueSize', 'averageServiceTime', 'queueStartTime', 'queueEndTime', 'queueStatus'], // Include all fields from Queue
                    include: [
                        {
                            model: db.AppointmentModel,
                            as: 'appointments',
                            attributes: ['appointmentID', 'appointmentDateTime', 'startTime', 'endTime', 'appointmentStatus'], // Include necessary fields from Appointments
                        },
                    ],
                },
            ],
        });

        if (!appointment) {
            throw new Error('Appointment not found');
        }

        const queueAppointments = appointment.queue.appointments;
        const sortedAppointments = queueAppointments.sort((a, b) => new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime));
        const currentPosition = sortedAppointments.findIndex(app => app.appointmentID === appointmentId) + 1; // 1-based index
        const remainingAppointments = sortedAppointments.slice(currentPosition);

        return {
            appointment: {
                id: appointment.appointmentID,
                dateTime: appointment.appointmentDateTime,
                status: appointment.appointmentStatus,
                position: currentPosition,
                remainingAppointments: remainingAppointments.length,
                service: {
                    name: appointment.service.name,
                    price: appointment.service.price,
                },
                customer: {
                    profile: appointment.customer_profile, // Include all fields from CustomerProfile if needed
                },
                vendor: {
                    name: appointment.vendor_profile.name,
                    businessname: appointment.vendor_profile.businessname,
                    businesstype: appointment.vendor_profile.businesstype,
                },
                queue: {
                    queueID: appointment.queue.queueID,
                    currentQueueSize: appointment.queue.currentQueueSize,
                    averageServiceTime: appointment.queue.averageServiceTime,
                    queueStartTime: appointment.queue.queueStartTime,
                    queueEndTime: appointment.queue.queueEndTime,
                    queueStatus: appointment.queue.queueStatus,
                    appointments: sortedAppointments.map(app => ({
                        appointmentID: app.appointmentID,
                        appointmentDateTime: app.appointmentDateTime,
                        startTime: app.startTime,
                        endTime: app.endTime,
                        appointmentStatus: app.appointmentStatus,
                    })),
                },
            },
        };
    } catch (error) {
        console.error("Error fetching appointment:", error);
        throw new Error("Failed to fetch appointment.");
    }
};

/**
 * Get Queue Status by Appointment Id
 * @param {number} appointmentId - Appointment ID
 * @returns {Object} - The Queue object
 * @throws {Error} - Throws error if the operation fails
 */
const getQueueStatusByAppointmentId = async (appointmentId) => {
    try {
        const appointment = await AppointmentModel.findByPk(appointmentId, {
            include: [
                {
                    model: db.QueueModel,
                    as: 'queue',
                    attributes: ['queueStatus'], // Include only queueStatus from Queue
                },
            ],
        });

        if (!appointment || !appointment.queue) {
            throw new Error('Appointment or Queue not found');
        }

        return appointment.queue.queueStatus;
    } catch (error) {
        console.error("Error fetching queue status:", error);
        throw new Error("Failed to fetch queue status.");
    }
};


/**
 * Update Appointment by ID
 * @param {number} appointmentId - Appointment ID
 * @param {Object} appointmentDetails - Appointment details to update
 * @returns {Object} - The updated Appointment object
 * @throws {Error} - Throws error if the operation fails
 */
const updateAppointment = async (appointmentId, appointmentDetails) => {
    try {
        const [updatedRows] = await AppointmentModel.update(appointmentDetails, { where: { appointmentid: appointmentId } });
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
        return await AppointmentModel.destroy({ where: { appointmentid: appointmentId } });
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
        return await AppointmentModel.findAll({ where: { vendorid: vendorId } });
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
        return await AppointmentModel.findAll({ where: { customerid: customerId } });
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

    console.log(queueId)
    try {
        return await AppointmentModel.findAll({ where: { queueid: queueId } });
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
        return await AppointmentModel.findAll({ where: { serviceid: serviceId, appointmentStatus:"scheduled" } });
    } catch (error) {
        console.error("Error fetching appointment:", error);
        throw new Error("Failed to fetch appointment.");
    }
}



const checkAppointment = async (vendorid, customerid, serviceid, queueid ) => {
    try {
        return await AppointmentModel.findOne({ where: { vendorprofileid: vendorid, customerprofileid: customerid, serviceid: serviceid, queueid: queueid}});
    }
    catch (error) {
        console.error("Error fetching appointment:", error);
        throw new Error("Failed to fetch appointment.");
    }
}

const getUpcomingAppointments = async (queueId) => {
    try {
        return await AppointmentModel.findAll({ 
            where: { queueid: queueId, appointmentStatus: 'scheduled' },
            order: [['appointmentDateTime', 'ASC']],
            include: ['service', 'customer_profile', 'vendor_profile'  ]

        });
    } catch (error) {
        console.error("Error fetching appointment:", error);
        throw new Error("Failed to fetch appointment.");
    }
}




/************************************************** Working on customer feed ******************************************************* */

/**
 * Get the number of appointments in the queue
 */
const getNumberOfAppointmentsInQueue = async (queueId) => {
    try {
        return await AppointmentModel.count({ where: { queueid: queueId } });
    } catch (error) {
        console.error("Error fetching appointment:", error);
        throw new Error("Failed to fetch appointment.");
    }
}


/**
 * Get the number of appointments in the queue which are scheduled, completed, cancelled or rescheduled
 * @param {number} queueId - Queue ID
 */
const getNumberOfAppointmentsInQueueByStatus = async (queueId, status) => {
    try {
        return await AppointmentModel.count({ where: { queueid: queueId, appointmentStatus: status } });
    } catch (error) {
        console.error("Error fetching appointment:", error);
        throw new Error("Failed to fetch appointment.");
    }
}


/**
 * Calculate Customer Position in the Queue
 */
const getCustomerAppointmentPosition = async (queueid,appointmentId) => {
    try {
        // Fetch all appointments sorted by date and time
        const appointments = await AppointmentModel.findAll({
            where: { queueid: queueid },
            order: [['appointmentDateTime', 'ASC']],
            attributes: ['appointmentID', 'appointmentDateTime']
        });

        const position = appointments.findIndex(appointment => appointment.appointmentID === appointmentId);

        // Return the position + 1 to represent the customer's turn (1-based index)
        return position === -1 ? null : position + 1;
    } catch (error) {
        console.error("Error calculating customer's appointment position:", error);
        throw new Error("Failed to calculate appointment position.");
    }
}




module.exports = {
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByVendorId,
    getAppointmentsByCustomerId,
    getAppointmentsByQueueId,
    getAppointmentsByServiceId,
    checkAppointment,
    getUpcomingAppointments,
    getNumberOfAppointmentsInQueue,
    getNumberOfAppointmentsInQueueByStatus,
    getCustomerAppointmentPosition,
    getQueueStatusByAppointmentId
};