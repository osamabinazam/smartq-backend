const OperatingHourService = require('../services/OperatingHourService');
const ProfileService = require('../services/ProfileService');

/**
 * Create a new OperatingHours
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createOperatingHours = async (req, res) => {

    // Check if the request body is empty
    if (!req.body) {
        return res.status(400).json({ error: "OperatingHours details cannot be empty" });
    }

    // Check if the request body has all the required fields
    if (!req.body.weekday || !req.body.opentime || !req.body.closetime || !req.body.isclosed) {
        return res.status(400).json({ error: "profileId, day, openTime and closeTime are required" });
    }

    // Check if the profile exists
    const profile = await ProfileService.getVendorProfileByUserId(req.user.userid);
    if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
    }

    operatingHours = req.body;
    operatingHours.vendorprofileid = profile.vendorprofileid;


    try {
        const newOperatingHours = await OperatingHourService.createOperatingHours(operatingHours);
        res.status(201).json(newOperatingHours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


/**
 * Export the OperatingHourController
 */
module.exports = {
    createOperatingHours
};
