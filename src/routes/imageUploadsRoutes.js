const express = require('express');
const uploadImage = require('../controllers/ImageController.js');
const { upload, imageProcessingMiddleware } = require('../middlewares/imageUploads.js');
const authenticateToken = require('../middlewares/authorization.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const claudniaryUploads = require('../utils/claudniaryUploads.js');

const router = express.Router();

// router.post('/upload', authenticateToken, authorizeRoles('vendor', 'customer'), upload, imageProcessingMiddleware, uploadImage);

module.exports = router;
