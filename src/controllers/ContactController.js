const ContactService = require('../services/ContactService');

/**
 * Create a new Contact
 * @param {object} req
 * @param {object} res
 * @returns {object} - The created Contact object
 */
const createContact = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: 'No contact data found in the request.',
        });
    }

    const contactData = {
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        userid: req.user.userid
    };

    console.log("Contact Data: ", contactData)

    try {

        const contact = await ContactService.createContact(contactData);
        return res.status(201).json(contact);
    } catch (error) {
        console.error('Failed to create contact:', error);
        return res.status(500).json({
            message: 'Failed to create contact',
            error: error.message,
        });
    }
}


/**
 * Get Contact by ID
 * @param {object} req
 * @param {object} res
 * @returns {object} - The Contact object
 * @throws {Error} - Throws error if the operation fails
 */
const getContactById = async (req, res) => {
    const contactId = req.params.id;
    try {
        const contact = await ContactService.getContactById(contactId);
        return res.status(200).json(contact);
    } catch (error) {
        console.error('Failed to fetch contact:', error);
        return res.status(500).json({
            message: 'Failed to fetch contact',
            error: error.message,
        });
    }
}

/**
 * Update Contact by ID
 * @param {object} req
 * @param {object} res
 * @returns {object} - The updated Contact object
 */
const updateContact = async (req, res) => {
    const contactId = req.params.id;
    const contactDetails = req.body;

    try {
        const updatedContact = await ContactService.updateContact(contactId, contactDetails);
        return res.status(200).json(updatedContact);
    } catch (error) {
        console.error('Failed to update contact:', error);
        return res.status(500).json({
            message: 'Failed to update contact',
            error: error.message,
        });
    }
}

/**
 * Delete Contact by ID
 * @param {object} req
 * @param {object} res
 * @returns {object} - The number of deleted rows
 */
const deleteContact = async (req, res) => {
    const contactId = req.params.id;
    try {
        const deletedRows = await ContactService.deleteContact(contactId);
        return res.status(200).json(deletedRows);
    } catch (error) {
        console.error('Failed to delete contact:', error);
        return res.status(500).json({
            message: 'Failed to delete contact',
            error: error.message,
        });
    }
}

/**
 * Get Contact by User ID
 * @param {object} req
 * @param {object} res
 * @returns {object} - The Contact object
 */
const getContactByUserId = async (req, res) => {
    const userId = req.user.id
    try {
        const contact = await ContactService.getContactByUserId(userId);
        return res.status(200).json(contact);
    } catch (error) {
        console.error('Failed to fetch contact:', error);
        return res.status(500).json({
            message: 'Failed to fetch contact',
            error: error.message,
        });
    }
}


/**
 * export the module
 * @type {object}
 */
module.exports = {
    createContact,
    getContactById,
    updateContact,
    deleteContact,
    getContactByUserId

};