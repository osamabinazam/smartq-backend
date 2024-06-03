const authenticateToken = require('../middlewares/authorization.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const RequestController = require('../controllers/RequestController');
const express = require('express');
const router = express.Router();

// Request Routes
router.post('/create', authenticateToken, authorizeRoles('customer'), RequestController.createRequest);
router.get('/', authenticateToken, authorizeRoles('customer', 'vendor'), RequestController.getAllRequest);
router.get('/:id', authenticateToken, authorizeRoles('customer', 'vendor'), RequestController.getRequestById);
router.post('/queue', authenticateToken, authorizeRoles('customer', 'vendor'), RequestController.getRequestByQueueId);
router.delete('/:id', authenticateToken, authorizeRoles('customer', 'vendor'), RequestController.deleteRequest);

module.exports = router;