import ProfileController from '../controllers/ProfileController.js';
import authenticateToken from '../middlewares/authorization.js';
import authorizeRoles from '../middlewares/authorizeRoles.js';
import express from 'express';
const router = express.Router();


// Vendor Profile Routes
router.post('/vendor', authenticateToken, authorizeRoles('vendor'), ProfileController.createVendorProfile);
router.get('/vendor', authenticateToken, authorizeRoles('vendor', 'customer'), ProfileController.getAllVendorProfiles);
router.get('/vendor/:id', authenticateToken, authorizeRoles('vendor', 'customer'), ProfileController.getVendorProfileById);
router.put('/vendor/:id', authenticateToken, authorizeRoles('vendor'), ProfileController.updateVendorProfile);
router.delete('/vendor/:id', authenticateToken, authorizeRoles('vendor'), ProfileController.deleteVendorProfile);


// Customer Profile Routes
router.post('/customer', authenticateToken, authorizeRoles('customer', 'admin', 'vendor'), ProfileController.createCustomerProfile);
router.get('/customer', authenticateToken, authorizeRoles('customer', 'admin', 'vendor'), ProfileController.getAllCustomerProfiles);
router.get('/customer/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ProfileController.getCustomerProfileById);
router.put('/customer/:id', authenticateToken, authorizeRoles('customer'), ProfileController.updateCustomerProfile);
router.delete('/customer/:id', authenticateToken, authorizeRoles('customer'), ProfileController.deleteCustomerProfile);


export default router;
