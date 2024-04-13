import ProfileController from '../controllers/ProfileController.js';
import authenticateToken from '../middlewares/authorization.js';
import authorizeRoles from '../middlewares/authorizeRoles.js';
import ContactController from '../controllers/ContactController.js';
import express from 'express';
const router = express.Router();

router.post('/contact', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.createContact);
router.get('/contact/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.getContactById);
router.put('/contact/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.updateContact);
router.delete('/contact/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.deleteContact);

export default router;