const ProfileController = require('../controllers/ProfileController.js');
const authenticateToken = require('../middlewares/authorization.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const ContactController = require('../controllers/ContactController.js');
const express = require('express');
const router = express.Router();

router.post('/contact', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.createContact);
router.get('/contact/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.getContactById);
router.put('/contact/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.updateContact);
router.delete('/contact/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.deleteContact);

module.exports = router;
