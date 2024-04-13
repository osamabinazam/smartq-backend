// src/routes/imageRoutes.js

import express from 'express';
import uploadImage  from '../controllers/ImageController.js';
import {  upload, imageProcessingMiddleware, } from '../middlewares/imageUploads.js'
import authenticateToken from '../middlewares/authorization.js';
import authorizeRoles from '../middlewares/authorizeRoles.js';
import claudniaryUploads from '../utils/claudniaryUploads.js';

const router = express.Router();
router.post('/upload',authenticateToken, authorizeRoles('vendor', 'customer'),upload, imageProcessingMiddleware, uploadImage);
export default router;
