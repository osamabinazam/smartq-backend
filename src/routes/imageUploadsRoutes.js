// src/routes/imageRoutes.js

import express from 'express';
import uploadImage  from '../controllers/ImageController.js';
import {  upload, imageProcessingMiddleware, } from '../middlewares/imageUploads.js'

const router = express.Router();
router.post('/upload', upload, imageProcessingMiddleware, uploadImage);
export default router;
