const ProfileController = require('../controllers/ProfileController.js');
const EducationController = require('../controllers/EducationController.js');
const OperatingHourController = require('../controllers/OperatingHourController.js');
const authenticateToken = require('../middlewares/authorization.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const express = require('express');
const router = express.Router();


router.get('/vendor/vendor-by-userid',authenticateToken, authorizeRoles('customer', 'vendor'), ProfileController.getVendorProfileByUserId )
router.get('/vendor/nearby', authenticateToken, authorizeRoles('vendor', 'customer'), ProfileController.getAllNearbyVendors);
// Vendor Profile Routes
router.post('/vendor', authenticateToken, authorizeRoles('vendor'), ProfileController.createVendorProfile);
router.get('/vendor', authenticateToken, authorizeRoles('vendor', 'customer'), ProfileController.getAllVendorProfiles);
router.get('/vendor/:id', authenticateToken, authorizeRoles('vendor', 'customer'), ProfileController.getVendorProfileById);
router.put('/vendor/:id', authenticateToken, authorizeRoles('vendor'), ProfileController.updateVendorProfile);
router.delete('/vendor/:id', authenticateToken, authorizeRoles('vendor'), ProfileController.deleteVendorProfile);


// Vendor's Education Routes
router.post('/vendor/:id/education', authenticateToken, authorizeRoles('vendor'), EducationController.createEducation);

// Vendor's Operating Hours Routes
router.post('/vendor/:id/operatinghour', authenticateToken, authorizeRoles('vendor'), OperatingHourController.createOperatingHours);
// Admin Profile Routes


// Customer Profile Routes
router.post('/customer', authenticateToken, authorizeRoles('customer', 'admin', 'vendor'), ProfileController.createCustomerProfile);
router.get('/customer', authenticateToken, authorizeRoles('customer', 'admin', 'vendor'), ProfileController.getAllCustomerProfiles);
router.get('/customer/customer-by-userid', authenticateToken, authorizeRoles('customer', 'vendor'), ProfileController.getCustomerProfileByUserId);


router.get('/customer/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ProfileController.getCustomerProfileById);
router.put('/customer/:id', authenticateToken, authorizeRoles('customer'), ProfileController.updateCustomerProfile);
router.delete('/customer/:id', authenticateToken, authorizeRoles('customer'), ProfileController.deleteCustomerProfile);

module.exports = router;
