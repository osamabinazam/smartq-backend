const db = require("../models/index.js");

const SocialMediaModel = db.SocialMediaModel;

/**
 * Create a new Social Media
 * @param {Object} socialMedia - Social Media object
 * @returns {Object} - The created Social Media object
 * @throws {Error} - Throws error if the operation fails
 */
const createSocialMedia = async (socialMedia) => {
    try {
        return await SocialMediaModel.create(socialMedia);
    } catch (error) {
        console.error("Error creating social media:", error);
        throw new Error("Failed to create social media.");
    }
}

/**
 * Get Social Media by ID
 * @param {number} socialMediaId - Social Media ID
 * @returns {Object} - The Social Media object
 * @throws {Error} - Throws error if the operation fails
 */
const getSocialMediaById = async (socialMediaId) => {
    try {
        return await SocialMediaModel.findByPk(socialMediaId);
    } catch (error) {
        console.error("Error fetching social media:", error);
        throw new Error("Failed to fetch social media.");
    }
}

/**
 * Update Social Media by ID
 * @param {number} socialMediaId - Social Media ID
 * @param {Object} socialMediaDetails - Social Media details to update
 * @returns {Object} - The updated Social Media object
 * @throws {Error} - Throws error if the operation fails
 */
const updateSocialMedia = async (socialMediaId, socialMediaDetails) => {
    try {
        const [updatedRows] = await SocialMediaModel.update(socialMediaDetails, { where: { socialmediaid: socialMediaId } });
        if (updatedRows === 0) {
            throw new Error("Social Media not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating social media:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

/**
 * Delete Social Media by ID
 * @param {number} socialMediaId - Social Media ID
 * @returns {number} - The number of deleted rows
 * @throws {Error} - Throws error if the operation fails
 */
const deleteSocialMedia = async (socialMediaId) => {
    try {
        return await SocialMediaModel.destroy({ where: { socialmediaid: socialMediaId } });
    } catch (error) {
        console.error("Error deleting social media:", error);
        throw new Error("Failed to delete social media.");
    }
}

module.exports = {
    createSocialMedia,
    getSocialMediaById,
    updateSocialMedia,
    deleteSocialMedia
};
