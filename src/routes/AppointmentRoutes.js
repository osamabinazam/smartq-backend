const AppointmentController = require('../controllers/AppointmentController');
const authenticateToken = require('../middlewares/authorization.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const express = require('express');

const router = express.Router();

// Appointment Routes
router.post('/create', authenticateToken, authorizeRoles('customer'), AppointmentController.createAppointment);
router.post('/upcoming', authenticateToken, authorizeRoles('vendor', 'customer'), AppointmentController.getUpcomingAppointments);

module.exports = router;