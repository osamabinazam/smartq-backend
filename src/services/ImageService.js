const db = require('../models/index.js');

const Image = db.ImageModel;

/**
 * Creates a new image entry in the database.
 * @param {Object} imageDetails - The details of the image to be created.
 * @returns {Promise<Object>} The created image object.
 */
const createImage = async (imageDetails) => {
    try {
        return await Image.create(imageDetails);
    } catch (error) {
        // Log the error or handle it as needed
        console.error("Error creating image:", error);
        throw new Error("Failed to create image.");
    }
};

/**
 * Updates an existing image entry in the database.
 * @param {Object} imageDetails - The details of the image to update.
 * @param {number} userId - The ID of the user associated with the image.
 * @returns {Promise<number>} The number of affected rows.
 */
const updateImage = async (imageDetails, userId) => {
    try {
        const [updatedRows] = await Image.update(imageDetails, { where: { userid: userId } });
        if (updatedRows === 0) {
            throw new Error("Image not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating image:", error);
        throw error; // Re-throw the error for the caller to handle
    }
};


/**
 * Deletes an image entry from the database.
 * @param {number} imageId - The ID of the image to delete.
 * @returns {Promise<number>} The number of rows affected (deleted).
 */
const deleteImage = async (imageId) => {
    try {
        const deletedRows = await Image.destroy({ where: { imageid: imageId } });
        if (deletedRows === 0) {
            throw new Error("Image not found.");
        }
        return deletedRows;
    } catch (error) {
        console.error("Error deleting image:", error);
        throw error; // Re-throw the error for the caller to handle
    }
};



/**
 * Retrieves images by user ID, categorizing them as profile and cover photos.
 * @param {number} userId - The user ID to search images for.
 * @returns {Promise<Object>} An object containing the profile and cover photos.
 */
const getImagesByUserId = async (userId) => {
    try {
        const images = await Image.findAll({ where: { userid: userId } });
        return images.reduce((acc, image) => {
            if (image.type === 'profile') {
                acc.profilePhoto = image;
            } else if (image.type === 'cover') {
                acc.coverPhoto = image;
            }
            return acc;
        }, { profilePhoto: {}, coverPhoto: {} });
    } catch (error) {
        console.error("Error fetching images:", error);
        throw new Error("Failed to fetch images.");
    }
};

module.exports = { createImage, updateImage, deleteImage, getImagesByUserId };
