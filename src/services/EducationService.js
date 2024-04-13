import db from '../models/index.js';

const EducationModel = db.EducationModel;

/**
 * Create a new Education
 * @param {Object} education - Education object
 * @returns {Object} - The created Education object
 * @throws {Error} - Throws error if the operation fails
 */
const createEducation = async (education) => {
    try {
        return await EducationModel.create(education);
    } catch (error) {
        console.error("Error creating education:", error);
        throw new Error("Failed to create education.");
    }
}

/**
 * Get Education by ID
 * @param {number} educationId - Education ID
 * @returns {Object} - The Education object
 * @throws {Error} - Throws error if the operation fails
 */
const getEducationById = async (educationId) => {
    try {
        return await EducationModel.findByPk(educationId);
    } catch (error) {
        console.error("Error fetching education:", error);
        throw new Error("Failed to fetch education.");
    }
}

/**
 * Update Education by ID
 * @param {number} educationId - Education ID
 * @param {Object} educationDetails - Education details to update
 * @returns {Object} - The updated Education object
 * @throws {Error} - Throws error if the operation fails
 */

const updateEducation = async (educationId, educationDetails) => {
    try {
        const [updatedRows] = await EducationModel
            .update(educationDetails, { where: { educationid: educationId } });
        if (updatedRows === 0) {
            throw new Error("Education not found or nothing to update.");
        }
        return updatedRows;
    }
    catch (error) {
        console.error("Error updating education:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

/**
 * Delete Education by ID
 * @param {number} educationId - Education ID
 * @returns {number} - The number of deleted rows
 * @throws {Error} - Throws error if the operation fails
 */
const deleteEducation = async (educationId) => {
    try {
        return await EducationModel.destroy({ where: { educationid: educationId } });
    } catch (error) {
        console.error("Error deleting education:", error);
        throw new Error("Failed to delete education.");
    }
}

export {
    createEducation,
    getEducationById,
    updateEducation,
    deleteEducation
}