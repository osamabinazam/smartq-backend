import AuthController from "../controllers/AuthController";
import express from 'express';
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/reset-password', AuthController.resetPassword);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);

export default router;
