const AppointmentService = require('../services/AppointmentService');

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

    if (!req.body.vendorid || !req.body.customerid || !req.body.serviceid || !req.body.queueid || !req.body.date || !req.body.time) {
        return res.status(400).json({
            message: 'All fields are required',
        });
    }

    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized. Please log in to create an appointment.',
        });
    }

    const appointmentData = {
        vendorid: req.body.vendorid,
        customerid: req.body.customerid,
        serviceid: req.body.serviceid,
        queueid: req.body.queueid,
        date: req.body.date,
        time: req.body.time
    };

    try {
        const appointment = await AppointmentService.createAppointment(appointmentData);
        return res.status(201).json(appointment);
    } catch (error) {
        console.error('Failed to create appointment:', error);
        return res.status(500).json({
            message: 'Failed to create appointment',
            error: error.message,
        });
    }
}

module.exports = createAppointment;
