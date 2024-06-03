const QueueController = require('../controllers/QueueController');
const authenticateToken = require('../middlewares/authorization.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const express = require('express');
const router = express.Router();

// Queue Routes
router.post('/create', authenticateToken, authorizeRoles('vendor'), QueueController.createQueue);
// router.get('/', authenticateToken, authorizeRoles('vendor'), QueueController.getFutureQueues);
router.get('/', authenticateToken, authorizeRoles('vendor', 'customer'), QueueController.getQueueByVendorId);


router.get('/status', authenticateToken, authorizeRoles('vendor', 'customer'), QueueController.getQueuesByStatus);

router.get('/inactive', authenticateToken, authorizeRoles('vendor' , 'customer'), QueueController.getFutureQueues);


module.exports = router;

