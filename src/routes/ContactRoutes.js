// const ProfileController = require('../controllers/ProfileController.js');
const authenticateToken = require('../middlewares/authorization.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const ContactController = require('../controllers/ContactController.js');
const express = require('express');
const router = express.Router();

router.post('/', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.createContact);
// router.get('/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.getContactById);
router.delete('/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.deleteContact);
router.get('/user', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.getContactByUserId);
router.put('/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.updateContact);
router.delete('/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.deleteContact);
router.get('/user', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), ContactController.getContactByUserId);


module.exports = router;
