import ProfileController from '../controllers/ProfileController.js';
import authenticateToken from '../middlewares/authorization.js';
import authorizeRoles from '../middlewares/authorizeRoles.js';
import express from 'express';
const router = express.Router();

router.post('/vendor', authenticateToken, authorizeRoles('vendor'), ProfileController.createVendorProfile);
router.get('vednor', authenticateToken, authorizeRoles('vendor'), ProfileController.getAllVendorProfiles);
router.get('/vendor/:id', authenticateToken, authorizeRoles('vendor'), ProfileController.getVendorProfileById);
router.put('/vendor/:id', authenticateToken, authorizeRoles('vendor'), ProfileController.updateVendorProfile);
router.delete('/vendor/:id', authenticateToken, authorizeRoles('vendor'), ProfileController.deleteVendorProfile);

export default router;
