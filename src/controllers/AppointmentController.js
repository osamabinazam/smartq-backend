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

    if (!req.body.appointmentDateTime || !req.body.appointmentStatus || !req.body.customerprofileid || !req.body.vendorprofileid || !req.body.serviceid || !req.body.queueid) {
        return res.status(400).json({
            message: 'All fields are required',
        });
    }

    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized. Please log in to create an appointment.',
        });
    }

    console.log("req.user", req.user)

    // Check if the user is a customer or vendor
    if (req.user.usertype !== 'customer') {
        return res.status(403).json({
            message: 'Forbidden. Only customers can create appointments.',
        });
    }



    //Check if the customer profile exists
    const customerProfile = await ProfileService.getCustomerProfileByUserId(req.user.userid);

    if (!customerProfile) {
        return res.status(404).json({
            message: 'Customer profile not found.',
        });
    }

    // Check if the vendor profile exists
    const vendorProfile = await ProfileService.getVendorProfileById(req.body.vendorprofileid);

    if (!vendorProfile) {
        return res.status(404).json({
            message: 'Vendor profile not found.',
        });
    }

    // Check if the service exists
    const service = await ProvideService.getServiceById(req.body.serviceid);

    if (!service) {
        return res.status(404).json({
            message: 'Service not found.',
        });
    }

    // Check the existence of appointment
    const appointmentExists = await AppointmentService.checkAppoitment(req.body.vendorprofileid, req.body.customerprofileid, req.body.serviceid, req.body.queueid);
    if (appointmentExists) {
        return res.status(400).json({
            message: 'Appointment already exists.',
        });
    }

    const appointmentData = {
        appointmentDateTime: req.body.appointmentDateTime,
        appointmentStatus: req.body.appointmentStatus,
        customerprofileid: req.body.customerprofileid,
        vendorprofileid: req.body.vendorprofileid,
        serviceid: req.body.serviceid,
        queueid: req.body.queueid,
    };

    try {
        const appointment = await AppointmentService.createAppointment(appointmentData);
        if (!appointment) {
            return res.status(500).json({
                message: 'Failed to create appointment',
            });
        }


        // Check if the queue exists
        const queue = await QueueService.getQueueById(req.body.queueid);

        if (!queue) {
            return res.status(404).json({
                message: 'Queue not found.',
            });
        }



        // Check if the queue is active
        if (queue.queueStatus !== 'active') {
            await QueueService.updateQueue(req.body.queueid, {
                currentQueueSize: queue.currentQueueSize + 1,
            }
            ).then((updatedQueue) => {
                if (!updatedQueue) {
                    return res.status(500).json({
                        message: 'Failed to update queue.',
                    });
                }

                return res.status(201).json(appointment);

            }
            );
        }

        // Check if the queue is full
        const averageTime = parseInt(queue.averageServiceTime * queue.currentQueueSize + queue.averageServiceTime + 5);
        //Check if average time exceeds the queue end time
        if (queue.queueEndTime < averageTime) {
            return res.status(400).json({
                message: 'Queue is full.',
            });
        }


        // Now Update the queue with the new queue size and the new average service time
        const newQueueSize = queue.currentQueueSize + 1;
        const newAverageServiceTime = (queue.averageServiceTime * queue.currentQueueSize + queue.averageServiceTime) / newQueueSize;
        const updatedQueue = await QueueService.updateQueue(req.body.queueid, {
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

    // Get queue id from request params
    const queueId = req.body.queueId;
    console.log("Queue ID is : ", req.body)
    console.log("Quueue id is : ", queueId)

    // if (req.user.usertype !== 'customer') {
    //     return res.status(403).json({
    //         message: 'Forbidden. Only customers can view appointments.',
    //     });
    // }



    try {
        // get scheduled appointments using queue id
        const appointmentsData = await AppointmentService.getUpcomingAppointments(queueId);


        if (!appointmentsData) {
            return res.status(404).json({
                message: 'No upcoming appointments found.',
            });
        }

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
