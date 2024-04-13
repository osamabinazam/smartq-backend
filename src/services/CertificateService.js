import db from "../models/index.js";

const CertificateModel = db.CertificateModel;

/**
 * Create a new Certificate
 * @param {Object} certificate - Certificate object
 * @returns {Object} - The created Certificate object
 * @throws {Error} - Throws error if the operation fails
 */
const createCertificate = async (certificate) => {
    try {
        return await CertificateModel.create(certificate);
    } catch (error) {
        console.error("Error creating certificate:", error);
        throw new Error("Failed to create certificate.");
    }
}

/**
 * Get Certificate by ID
 * @param {number} certificateId - Certificate ID
 * @returns {Object} - The Certificate object
 * @throws {Error} - Throws error if the operation fails
 */

const getCertificateById = async (certificateId) => {
    try {
        return await CertificateModel.findByPk(certificateId);
    } catch (error) {
        console.error("Error fetching certificate:", error);
        throw new Error("Failed to fetch certificate.");
    }
}


/**
 * Update Certificate by ID
 * @param {number} certificateId - Certificate ID
 * @param {Object} certificateDetails - Certificate details to update
 * @returns {Object} - The updated Certificate object
 * @throws {Error} - Throws error if the operation fails
 */
const updateCertificate = async (certificateId, certificateDetails) => {
    try {
        const [updatedRows] = await CertificateModel.update(certificateDetails, { where: { certificateid: certificateId } });
        if (updatedRows === 0) {
            throw new Error("Certificate not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating certificate:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

/**
 * Delete Certificate by ID
 * @param {number} certificateId - Certificate ID
 * @returns {number} - The number of deleted rows
 * @throws {Error} - Throws error if the operation fails
 */
const deleteCertificate = async (certificateId) => {
    try {
        return await CertificateModel.destroy({ where: { certificateid: certificateId } });
    } catch (error) {
        console.error("Error deleting certificate:", error);
        throw new Error("Failed to delete certificate.");
    }
}

export {
    createCertificate,
    getCertificateById,
    updateCertificate,
    deleteCertificate
};

