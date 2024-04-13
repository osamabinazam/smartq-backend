// File: fileUploadUtils.js

import multer from "multer";
import axios from "axios";

import cl from 'cloudinary';
const cloudinary = cl.v2;
import streamifier from 'streamifier';


cloudinary.config({
  cloud_name: "dbxudp6uh",
  api_key:"595284681912747",
  api_secret: "2iY0eowdVdmpP7kHnpe2w3qtW9A",
});

// Set up Multer for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

// Function to upload a single file to Cloudinary
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

const uploadSingleMiddleware = upload.single("image"); // Middleware for single file upload
const uploadMultipleMiddleware = upload.array("images"); // Middleware for multiple file upload

export default  {
  uploadSingleFile,
  uploadMultipleFiles,
  uploadSingleMiddleware,
  uploadMultipleMiddleware,
};