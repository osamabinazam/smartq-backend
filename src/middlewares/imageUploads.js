const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Configure multer with memory storage to temporarily hold files for processing
const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'coverPhoto', maxCount: 1 }
]);

// Function to save processed image to disk
const saveImageToFile = (buffer, filename) => {
    const directoryPath = path.join(__dirname, '../../public/images'); // Set the path relative to current file
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true }); // Ensure directory exists
    }
    const filePath = path.join(directoryPath, filename);
    fs.writeFileSync(filePath, buffer);
    return filePath;
};

// Middleware for image processing
const imageProcessingMiddleware = async (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({ message: 'No files were uploaded.' });
        }

        const tasks = Object.entries(req.files).flatMap(([key, files]) =>
            files.map(async (file) => {
                // Set dimensions based on the image type
                const dimensions = key === 'coverPhoto' ? { width: 1200, height: 300 } : { width: 300, height: 300 };
                
                // Process the image with sharp
                const processedBuffer = await sharp(file.buffer)
                    .resize(dimensions.width, dimensions.height)
                    .jpeg({ quality: 90 })
                    .toBuffer();

                // Save the processed image to disk
                const newFilename = `${Date.now()}-${file.originalname}`;
                file.path = saveImageToFile(processedBuffer, newFilename);
                file.filename = newFilename; // Update filename to be potentially stored in DB
            })
        );

        await Promise.all(tasks);
        next();
    } catch (error) {
        console.error("Error processing images:", error);
        res.status(500).send({ message: 'Error processing images', error: error.message });
    }
};

module.exports = {
    upload,
    imageProcessingMiddleware
};



// const multer = require("multer");
// const sharp = require("sharp");
// const fs = require("fs");
// const path = require("path");
// const { fileURLToPath } = require("url");

// // Use memory storage to temporarily hold files for processing
// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage }).fields([
//     { name: 'profilePhoto', maxCount: 1 },
//     { name: 'coverPhoto', maxCount: 1 }
// ]);

// // Function to save processed image to disk
// const saveImageToFile = (buffer, filename) => {
//     const __dirname = path.dirname(__filename); // Use __filename instead of import.meta.url
//     const filePath = path.join(__dirname, '../../public/images', filename);
//     fs.writeFileSync(filePath, buffer);
//     return filePath;
// };

// // Middleware for image processing
// const imageProcessingMiddleware = async (req, res, next) => {
//     try {
//          if (!req.files || Object.keys(req.files).length === 0) {
//             return res.status(400).send({ message: 'No files were uploaded.' });
//         }

//         const files = req.files;
//         console.log("Files : ", files)
//         await Promise.all(
//             Object.keys(files).map(async (key) => {
//                 await Promise.all(
//                     files[key].map(async (file) => {
//                         // Determine dimensions based on the type of image
//                         let dimensions = { width: 300, height: 300 }; // Default dimensions for profile photos
//                         if (key === 'coverPhoto') {
//                             dimensions = { width: 1200, height: 300 }; // Specific dimensions for cover photos
//                         }

//                         // Process image with sharp
//                         const processedBuffer = await sharp(file.buffer)
//                             .resize(dimensions.width, dimensions.height)
//                             .jpeg({ quality: 90 }) // Convert to JPEG for uniformity and set quality
//                             .toBuffer();

//                         // Save processed image to disk
//                         const newFilename = `${Date.now()}-${file.originalname}`;
//                         file.path = saveImageToFile(processedBuffer, newFilename);
//                         file.filename = newFilename; // Update filename for further processing or database saving
//                     })
//                 );
//             })
//         );
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: 'Error processing images', error: error.toString() });
//     }
// };

// module.exports = {
//     upload,
//     imageProcessingMiddleware
// };
