import db from '../models/index.js';

const Image = db.ImageModel;

const createImage = async (imageDetails) => {
    try {
        return await Image.create(imageDetails);
    } catch (error) {
        // Log the error or handle it as needed
        console.error("Error creating image:", error);
        throw new Error("Failed to create image.");
    }
};

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

export default { createImage, updateImage, deleteImage, getImagesByUserId };
