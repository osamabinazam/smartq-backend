const AppointmentService = require('../services/AppointmentService');
const ProfileService = require('../services/ProfileService');
const ProvideService = require('../services/ProvideService');
const QueueService = require('../services/QueueService');

/**
 * Create Vendor's Appointment
 * @param {object} req
 * @param {object} res
 * @returns {object} appointment object
 */
const createAppointment = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: 'No appointment data found in the request.',
        });
    }

    const {
        appointmentDateTime,
        appointmentStatus,

        vendorprofileid,
        serviceid,
        queueid
    } = req.body;

    if (!appointmentDateTime || !appointmentStatus || !vendorprofileid || !serviceid || !queueid) {
        return res.status(400).json({
            message: 'All fields are required',
        });
    }

    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized. Please log in to create an appointment.',
        });
    }

    console.log("req.user", req.user);

    // Check if the user is a customer or vendor
    if (req.user.usertype !== 'customer') {
        return res.status(403).json({
            message: 'Forbidden. Only customers can create appointments.',
        });
    }

    try {
        // Check if the customer profile exists
        const customerProfile = await ProfileService.getCustomerProfileByUserId(req.user.userid);

        if (!customerProfile) {
            return res.status(404).json({
                message: 'Customer profile not found.',
            });
        }


        console.log(customerProfile)

        // Check if the vendor profile exists
        const vendorProfile = await ProfileService.getVendorProfileById(vendorprofileid);

        if (!vendorProfile) {
            return res.status(404).json({
                message: 'Vendor profile not found.',
            });
        }

        // Check if the service exists
        const service = await ProvideService.getServiceById(serviceid);

        if (!service) {
            return res.status(404).json({
                message: 'Service not found.',
            });
        }

        // Check if the queue exists
        const queue = await QueueService.getQueueById(queueid);

        if (!queue) {
            return res.status(404).json({
                message: 'Queue not found.',
            });
        }

        // Check if the queue is active
        if (queue.queueStatus !== 'active') {
            return res.status(400).json({
                message: 'Queue is not active.',
            });
        }

        // Check the existence of appointment
        const appointmentExists = await AppointmentService.checkAppointment(vendorprofileid, customerProfile.dataValues.customerprofileid, serviceid, queueid);
        if (appointmentExists) {
            return res.status(400).json({
                message: 'Appointment already exists.',
            });
        }

        const appointmentData = {
            appointmentDateTime,
            startTime: null,
            endTime: null,
            appointmentStatus,
            customerprofileid:customerProfile.dataValues.customerprofileid,
            vendorprofileid,
            serviceid,
            queueid,
        };

        const appointment = await AppointmentService.createAppointment(appointmentData);

        if (!appointment) {
            return res.status(500).json({
                message: 'Failed to create appointment',
            });
        }

        // Now update the queue with the new queue size and the new average service time
        const newQueueSize = queue.currentQueueSize + 1;
        const newAverageServiceTime = (queue.averageServiceTime * queue.currentQueueSize + queue.averageServiceTime) / newQueueSize;
        const updatedQueue = await QueueService.updateQueue(queueid, {
            currentQueueSize: newQueueSize,
            averageServiceTime: newAverageServiceTime,
        });

        if (!updatedQueue) {
            return res.status(500).json({
                message: 'Failed to update queue.',
            });
        }

        return res.status(201).json(appointment);
    } catch (error) {
        console.error('Failed to create appointment:', error);
        return res.status(500).json({
            message: 'Failed to create appointment',
            error: error.message,
        });
    }
}

/**
 * Get Upcoming Appointments
 * @param {object} req
 * @param {object} res
 * @returns {object} appointments
 */
const getUpcomingAppointments = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized. Please log in to view appointments.',
        });
    }

    if (!req.body) {
        return res.status(400).json({
            message: 'No appointment data found in the request.',
        });
    }

    const queueid = req.body.queueid;

    try {
        const appointmentsData = await AppointmentService.getUpcomingAppointments(queueid);

        if (!appointmentsData) {
            return res.status(404).json({
                message: 'No upcoming appointments found.',
            });
        }

        console.log(appointmentsData)

        return res.status(200).json(appointmentsData);
    } catch (error) {
        console.error('Failed to fetch upcoming appointments:', error);
        return res.status(500).json({
            message: 'Failed to fetch upcoming appointments.',
            error: error.message,
        });
    }
}

module.exports = {
    createAppointment,
    getUpcomingAppointments,
};
