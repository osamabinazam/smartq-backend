const EducationService = require('../services/EducationService.js');
const ProfileService = require('../services/ProfileService.js');

/**
 * Create a new Education
 * @param {object} req
 * @param {object} res
 * @returns {object} - The created Education object
 * @throws {object} - The error object
 */

const createEducation = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: 'No education data found in the request.',
        });
    }

    if (!req.body.school) {
        return res.status(400).json({
            message: 'School name is required',
        });
    }

    if (!req.body.degree) {
        return res.status(400).json({
            message: 'Degree is required',
        });
    }

    if (!req.body.startAt) {
        return res.status(400).json({
            message: 'Start date is required',
        });
    }

    // get the vendor profile from userid
    const vendor = await ProfileService.getVendorProfileByUserId(req.user.userid);

    const educationData = {
        school: req.body.school,
        degree: req.body.degree,
        startAt: req.body.startAt,
        endAt: req.body.endAt,
        description: req.body.description,
        vendorprofileid: vendor.vendorprofileid,
    };

    try {

        console.log("Education Data: ", educationData)

        const education = await EducationService.createEducation(educationData);
        return res.status(201).json(education);
    } catch (error) {
        console.error('Failed to create education:', error);
        return res.status(500).json({
            message: 'Failed to create education',
            error: error.message,
        });
    }
}


/**
 * Export the Education controller
 */
module.exports = {
    createEducation,
};
