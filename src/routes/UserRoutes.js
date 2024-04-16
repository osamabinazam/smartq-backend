const UserControllers = require('../controllers/UserController.js');
const authenticateToken = require('../middlewares/authorization.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const express = require('express');
const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('admin', 'customer', 'vendor'), UserControllers.getAll);
router.get('/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), UserControllers.getById);
router.get('/username/:username', authenticateToken, authorizeRoles('customer', 'vendor', 'admin'), UserControllers.getByUsername);

// update the user
router.put('/:id', authenticateToken, UserControllers.update);

// delete a user
router.delete('/:id', authenticateToken, UserControllers.deleteUser);

// delete all users
router.delete('/', authenticateToken, authorizeRoles('admin'), UserControllers.deleteUser);

module.exports = router;
