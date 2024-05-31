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

/**
 * Get Appointment by ID
 * @param {number} appointmentId - Appointment ID
 * @returns {Object} - The Appointment object
 * @throws {Error} - Throws error if the operation fails
 */
const getAppointmentById = async (appointmentId) => {
    try {
        return await AppointmentModel.findByPk(appointmentId,);
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



const checkAppoitment = async (vendorid, customerid, serviceid, queueid ) => {
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
        console.log("Queue UD in Srevice is : ", queueId)
        return await AppointmentModel.findAll({ where: { queueid: queueId },
            order: [['appointmentDateTime', 'ASC']],
            include: ['customer_profile', 'service']
            
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
            attributes: ['appointmentid', 'appointmentDateTime']
        });

        // Find the index of the appointment with the given appointmentId
        const position = appointments.findIndex(appointment => appointment.appointmentid === appointmentId);

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
    checkAppoitment,
    getUpcomingAppointments,
    getNumberOfAppointmentsInQueue,
    getNumberOfAppointmentsInQueueByStatus,
};