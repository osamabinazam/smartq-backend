const AppointmentController = require('../controllers/AppointmentController');
const authenticateToken = require('../middlewares/authorization.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const express = require('express');

const router = express.Router();

// Appointment Routes
router.post('/create', authenticateToken, authorizeRoles('customer', 'vendor'), AppointmentController.createAppointment);
router.post('/upcoming', authenticateToken, authorizeRoles('vendor', 'customer'), AppointmentController.getUpcomingAppointments);
router.put('/update/:id', authenticateToken, authorizeRoles('vendor', 'customer'), AppointmentController.updateAppointment);

module.exports = router;