const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, updateImage, deleteImage } = require('../controllers/ImageController.js');
const { upload, imageProcessingMiddleware } = require('../middlewares/imageUploads.js');
const authenticateToken = require('../middlewares/authorization.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');


// POST route for uploading images
router.post('/upload', 
    authenticateToken, 
    authorizeRoles('vendor', 'customer', 'admin'), // Correct roles array syntax
    upload, 
    imageProcessingMiddleware, 
    uploadImage
);

// PUT route for updating images
router.put('/update', 
    authenticateToken, 
    authorizeRoles('vendor', 'customer', 'admin'), // Correct roles array syntax
    upload, 
    imageProcessingMiddleware, 
    updateImage
);

// DELETE route for deleting an image
router.delete('/delete/:imageid', // Correct method to define route
    authenticateToken, 
    authorizeRoles('vendor', 'customer'), 
    deleteImage
);

module.exports = router;
