import UserControllers from '../controllers/UserController.js';
import authenticateToken from '../middlewares/authorization.js';
import authorizeRoles from '../middlewares/authorizeRoles.js';
import express from 'express';
const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('admin', 'customer', 'vendor'), UserControllers.getAll);
router.get('/:id', authenticateToken, authorizeRoles('customer', 'vendor', 'admin') ,UserControllers.getById);
router.get('/username/:username', authenticateToken,authorizeRoles('customer', 'vendor', 'admin'), UserControllers.getByUsername);

// update the user
router.put('/:id', authenticateToken, UserControllers.update);

// delete a user
router.delete('/:id', authenticateToken, UserControllers.deleteUser);

// delete all users
router.delete('/', authenticateToken, authorizeRoles('admin'), UserControllers.deleteUser);

// get user based on usertype
// router.get('/usertype/:usertype', authenticateToken, authorizeRoles('admin', 'vendor', 'customer'), UserControllers.getByUserType);


export default router;
