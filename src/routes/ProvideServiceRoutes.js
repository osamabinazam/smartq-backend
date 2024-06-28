const ProvideServiceController = require('../controllers/ProvideServiceController');
const authenticateToken = require('../middlewares/authorization');
const authorizeRoles = require('../middlewares/authorizeRoles');
const express = require('express');
const router = express.Router();

// Provide Service Routes
router.post('/', authenticateToken, authorizeRoles('vendor'), ProvideServiceController.createService);

// Update Service
router.put('/:id', authenticateToken, authorizeRoles('vendor'), ProvideServiceController.updateService);

// Delete Service
router.delete('/:id', authenticateToken, authorizeRoles('vendor'), ProvideServiceController.deleteService);


router.get('/vendor-services', authenticateToken, authorizeRoles('vendor'), ProvideServiceController.getVendorServices);

module.exports = router;