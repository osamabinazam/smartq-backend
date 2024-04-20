const multer = require("multer");
const axios = require("axios");

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: "dbxudp6uh",
  api_key: "595284681912747",
  api_secret: "2iY0eowdVdmpP7kHnpe2w3qtW9A",
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadSingleFile = async (file) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "images",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });

    return {
      imageUrl: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

const uploadMultipleFiles = async (files) => {
  const uploadedFilesInfo = [];
  console.log(files);

  try {
    await Promise.all(
      files.map(async (file) => {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "images",
              public_id: `${Date.now()}`,
              resource_type: "auto",
              encoding: "7bit",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          streamifier.createReadStream(file.buffer).pipe(stream);
        });

        uploadedFilesInfo.push({
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      })
    );

    return uploadedFilesInfo;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload files to Cloudinary");
  }
};

const uploadSingleMiddleware = upload.single("image");
const uploadMultipleMiddleware = upload.array("images");

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
  uploadSingleMiddleware,
  uploadMultipleMiddleware,
};



// const multer = require("multer");
// const cloudinary = require('cloudinary').v2;
// const streamifier = require('streamifier');

// // Environment variables should be used for sensitive information
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// /**
//  * Uploads a single file to Cloudinary.
//  * @param {Object} file - file object containing buffer and other metadata.
//  * @returns {Object} - object containing URL and public ID of the uploaded file.
//  */
// const uploadSingleFile = async (file) => {
//   try {
//     return await new Promise((resolve, reject) => {
//       const uploadOptions = {
//         folder: "images",
//         resource_type: "auto",
//         public_id: `${Date.now()}`
//       };

//       const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
//         if (error) {
//           console.error('Upload Error:', error);
//           reject(new Error("Failed to upload file to Cloudinary."));
//         } else {
//           resolve({ imageUrl: result.secure_url, publicId: result.public_id });
//         }
//       });

//       streamifier.createReadStream(file.buffer).pipe(stream);
//     });
//   } catch (error) {
//     console.error('Cloudinary API Error:', error);
//     throw new Error("Failed to upload file to Cloudinary");
//   }
// };

// /**
//  * Uploads multiple files to Cloudinary.
//  * @param {Array} files - array of file objects to upload.
//  * @returns {Array} - array of objects containing URLs and public IDs of uploaded files.
//  */
// const uploadMultipleFiles = async (files) => {
//   const uploadPromises = files.map(file => uploadSingleFile(file));
//   try {
//     return await Promise.all(uploadPromises);
//   } catch (error) {
//     console.error('Batch Upload Error:', error);
//     throw new Error("Failed to upload files to Cloudinary");
//   }
// };

// const uploadSingleMiddleware = upload.single("image");
// const uploadMultipleMiddleware = upload.array("images");

// module.exports = {
//   uploadSingleFile,
//   uploadMultipleFiles,
//   uploadSingleMiddleware,
//   uploadMultipleMiddleware,
// };
