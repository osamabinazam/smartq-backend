import db from "../models/index.js";

const ContactModel = db.ContactModel;

/**
 * Create a new Contact
 * @param {Object} contact - Contact object
 * @returns {Object} - The created Contact object
 * @throws {Error} - Throws error if the operation fails
 */
const createContact = async (contact) => {
    try {
        return await ContactModel.create(contact);
    } catch (error) {
        console.error("Error creating contact:", error);
        throw new Error("Failed to create contact.");
    }
}

/**
 * Get Contact by ID
 * @param {number} contactId - Contact ID
 * @returns {Object} - The Contact object
 * @throws {Error} - Throws error if the operation fails
 */
const getContactById = async (contactId) => {
    try {
        return await ContactModel.findByPk(contactId);
    } catch (error) {
        console.error("Error fetching contact:", error);
        throw new Error("Failed to fetch contact.");
    }
}

/**
 * Update Contact by ID
 * @param {number} contactId - Contact ID
 * @param {Object} contactDetails - Contact details to update
 * @returns {Object} - The updated Contact object
 * @throws {Error} - Throws error if the operation fails
 */
const updateContact = async (contactId, contactDetails) => {
    try {
        const [updatedRows] = await ContactModel.update(contactDetails, { where: { contactid: contactId } });
        if (updatedRows === 0) {
            throw new Error("Contact not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating contact:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}

/**
 * Delete Contact by ID
 * @param {number} contactId - Contact ID
 * @returns {number} - The number of deleted rows
 * @throws {Error} - Throws error if the operation fails
 */
const deleteContact = async (contactId) => {
    try {
        return await ContactModel.destroy({ where: { contactid: contactId } });
    } catch (error) {
        console.error("Error deleting contact:", error);
        throw new Error("Failed to delete contact.");
    }
}


export {
    createContact,
    getContactById,
    updateContact,
    deleteContact
}
