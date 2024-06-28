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
        customerprofileid,
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

    // console.log("req.user", req.user);

    // Check if the user is a customer or vendor
    // if (req.user.usertype !== 'customer') {
    //     return res.status(403).json({
    //         message: 'Forbidden. Only customers can create appointments.',
    //     });
    // }

    try {

        console.log(req.body)
        // Check if the customer profile exists
        const customerProfile = await ProfileService.getCustomerProfileById(customerprofileid);

        if (!customerProfile) {
            return res.status(404).json({
                message: 'Customer profile not found.',
            });
        }



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
        const appointmentExists = await AppointmentService.checkAppointment(vendorprofileid, customerprofileid, serviceid, queueid);
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
            customerprofileid,
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

/**
 * Update Appointment
 */
const updateAppointment = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: 'No appointment data found in the request.',
        });
    }

    const appointmentId = req.params.id;

    if (!appointmentId) {
        return res.status(400).json({
            message: 'Appointment ID is required',
        });
    }

    try {
        const appointment = await AppointmentService.getAppointmentById(appointmentId);

        if (!appointment) {
            return res.status(404).json({
                message: 'Appointment not found.',
            });
        }

        const updatedAppointment = await AppointmentService.updateAppointment(appointmentId, req.body);

        if (!updatedAppointment) {
            return res.status(500).json({
                message: 'Failed to update appointment.',
            });
        }

        return res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error('Failed to update appointment:', error);
        return res.status(500).json({
            message: 'Failed to update appointment.',
            error: error.message,
        });
    }
}


/**
 * Get Appointment Detail
 */
const getAppointmentDetail = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized. Please log in to view appointments.',
        });
    }

    const appointmentId = req.params.id; // Get appointment ID from the request params

    if (!appointmentId) {
        return res.status(400).json({
            message: 'Appointment ID is required',
        });
    }

    try {
        // Retrieve queue status only
        const queueStatus = await AppointmentService.getQueueStatusByAppointmentId(appointmentId);

        if (queueStatus !== 'active') {
            // Fetch minimal information if the queue is not active
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
                        attributes: ['name', 'businessname', 'businesstype'], // Include only required fields from VendorProfile
                    },
                ],
            });

            if (!appointment) {
                return res.status(404).json({
                    message: 'Appointment not found.',
                });
            }

            return res.status(200).json({
                message: 'Queue is not active',
                minimalInfo: {
                    queueID: appointment.queue.queueID,
                    service: {
                        name: appointment.service.name,
                        price: appointment.service.price,
                    },
                    vendor: {
                        name: appointment.vendor_profile.name,
                        businessname: appointment.vendor_profile.businessname,
                        businesstype: appointment.vendor_profile.businesstype,
                    },
                },
            });
        }

        // Fetch detailed information if the queue is active
        const appointment = await AppointmentService.getAppointmentById(appointmentId);

        if (!appointment) {
            return res.status(404).json({
                message: 'Appointment not found.',
            });
        }

        // Calculate the customer's position in the queue
        const position = await AppointmentService.getCustomerAppointmentPosition(appointment.appointment.queue.queueID, appointmentId);

        // Calculate the number of completed appointments
        const completedAppointments = await AppointmentService.getNumberOfAppointmentsInQueueByStatus(appointment.appointment.queue.queueID, 'completed');

        // Calculate the number of remaining appointments
        const totalAppointments = await AppointmentService.getNumberOfAppointmentsInQueue(appointment.appointment.queue.queueID);
        const remainingAppointments = totalAppointments - completedAppointments - 1;

        return res.status(200).json({
            appointment: {
                id: appointment.appointment.id,
                dateTime: appointment.appointment.dateTime,
                status: appointment.appointment.status,
                position: position,
                remainingAppointments: remainingAppointments,
                completedAppointments: completedAppointments,
                totalAppointments: totalAppointments,
                service: {
                    name: appointment.appointment.service.name,
                    price: appointment.appointment.service.price,
                },
                customer: {
                    profile: appointment.appointment.customer.profile, // Include all fields from CustomerProfile if needed
                },
                vendor: {
                    name: appointment.appointment.vendor.name,
                    businessname: appointment.appointment.vendor.businessname,
                    businesstype: appointment.appointment.vendor.businesstype,
                },
                queue: {
                    queueID: appointment.appointment.queue.queueID,
                    currentQueueSize: appointment.appointment.queue.currentQueueSize,
                    averageServiceTime: appointment.appointment.queue.averageServiceTime,
                    queueStartTime: appointment.appointment.queue.queueStartTime,
                    queueEndTime: appointment.appointment.queue.queueEndTime,
                    queueStatus: appointment.appointment.queue.queueStatus,
                    appointments: appointment.appointment.queue.appointments,
                },
            },
        });
    } catch (error) {
        console.error('Failed to fetch appointment:', error);
        return res.status(500).json({
            message: 'Failed to fetch appointment.',
            error: error.message,
        });
    }
};

module.exports = {
    createAppointment,
    getUpcomingAppointments,
    updateAppointment,
    getAppointmentDetail
};
