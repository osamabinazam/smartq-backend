import AuthController from "../controllers/AuthController.js";
import authenticateToken from "../middlewares/authorization.js";
import express from 'express';
const router = express.Router();


router.post('/login' ,AuthController.login);
router.post('/reset-password', authenticateToken, AuthController.resetPassword);
router.post('/register', AuthController.register);
router.post('/logout',authenticateToken ,AuthController.logout);


export default router;
