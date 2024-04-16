const LocationService = require('../services/LocationService.js');
const ProfileService = require('../services/ProfileService.js');

/**
 * Create Vendor's Location
 * @param {object} req
 * @param {object} res
 * @returns {object} location object
 */

const createLocation = async (req, res) => {

    if (!req.body.address || !req.body.city || !req.body.state || !req.body.postalcode || !req.body.longitude || !req.body.latitude) {
        return res.status(400).json({
            message: 'All fields are required',
        });
    }

    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized. Please log in to create a location.',
        });
    }


    if (!req.body){
        return res.status(400).json({
            message: 'No location data found in the request.',
        });
    }

    const userid = req.user.userid;
    var vendorProfile = null;
    
    try{
        vendorProfile = await ProfileService.getVendorProfileByUserId(userid);
        console.log(vendorProfile)
        if (!vendorProfile){
            return res.status(404).json({
                message: 'Vendor Profile not found',
            });
        }
    }
    catch(error){
        console.error('Failed to fetch vendor profile:', error);
        return res.status(404).json({
            message: 'Vendor Profile not found',
            error: error.message,
        });
    }
    if (!vendorProfile){
        return res.status(404).json({
            message: 'Vendor Profile not found',
        });
    }


    
    const locationData = {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postalcode: req.body.postalcode,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        vendorprofileid: vendorProfile.vendorprofileid
    };    
    

    try {
        const location = await LocationService.createLocation(locationData);
        res.status(201).json({
            message: 'Location created successfully',
            data: location,
        });
    } catch (error) {
        console.error('Failed to create location:', error);
        res.status(500).json({
            message: 'Failed to create location due to an internal error.',
            error: error.message,
        });
    }
}


/**
 * Controller to handle the retrieval of all locations
 * @param {object} req
 * @param {object} res
 * @returns {Array} location objects array
 */
const getAllLocations = async (req, res) => {
    try {
        const locations = await LocationService.getAllLocations();
        res.status(200).json({
            message: 'Locations fetched successfully',
            data: locations,
        });
    } catch (error) {
        console.error('Failed to fetch locations:', error);
        res.status(500).json({
            message: 'Failed to fetch locations due to an internal error.',
            error: error.message,
        });
    }
}


/**
 * Controller to handle the retrieval of a location by ID
 * @param {object} req
 * @param {object} res
 * @returns {object} location object
 */
const getLocationById = async (req, res) => {
    const id = req.params.id;
    try {
        const location = await LocationService.getLocationById(id);
        if (!location) {
            return res.status(404).json({
                message: 'Location not found',
            });
        }
        res.status(200).json({
            message: 'Location fetched successfully',
            data: location,
        });
    } catch (error) {
        console.error('Failed to fetch location:', error);
        res.status(500).json({
            message: 'Failed to fetch location due to an internal error.',
            error: error.message,
        });
    }
}


/**
 * Controller to handle the retrieval of a all locations by vendor profile ID
 * @param {object} req
 * @param {object} res
 * @returns {Array} location objects array
 */
const getLocationsByVendorProfileId = async (req, res) => {

    if (!req.params.id) {
        return res.status(400).json({
            message: 'Vendor Profile ID is required',
        });
    }
    const id = req.params.id;
    try {
        const locations = await LocationService.getLocationsByVendorProfileId(id);
        if (!locations) {
            return res.status(404).json({
                message: 'Locations not found',
            });
        }
        res.status(200).json({
            message: 'Locations fetched successfully',
            data: locations,
        });
    } catch (error) {
        console.error('Failed to fetch locations:', error);
        res.status(500).json({
            message: 'Failed to fetch locations due to an internal error.',
            error: error.message,
        });
    }
}


/**
 * Controller to handle the update of a location
 * @param {object} req
 * @param {object} res
 * @returns {object} location object
 */
const updateLocation = async (req, res) => {
    const id = req.params.id;
    if (!req.params.id) {
        return res.status(400).json({
            message: 'Location ID is required',
        });
    }

    if (!req.body) {
        return res.status(400).json({
            message: 'No location data found in the request.',
        });
    }
    try {
        const location = await LocationService.updateLocation(id, req.body);
        res.status(200).json({
            message: 'Location updated successfully',
            data: location,
        });
    } catch (error) {
        console.error('Failed to update location:', error);
        res.status(500).json({
            message: 'Failed to update location due to an internal error.',
            error: error.message,
        });
    }
}


/**
 * Controller to handle the deletion of a location
 * @param {object} req
 * @param {object} res
 * @returns {object} location object
 */
const deleteLocation = async (req, res) => {
    const id = req.params.id;
    if (!req.params.id) {
        return res.status(400).json({
            message: 'Location ID is required',
        });
    }
    try {
        const location = await LocationService.deleteLocation(id);
        res.status(200).json({
            message: 'Location deleted successfully',
            data: location,
        });
    } catch (error) {
        console.error('Failed to delete location:', error);
        res.status(500).json({
            message: 'Failed to delete location due to an internal error.',
            error: error.message,
        });
    }
}

/**
 * Export controller functions
 */

module.exports = {
    createLocation,
    getAllLocations,
    getLocationById,
    getLocationsByVendorProfileId,
    updateLocation,
    deleteLocation,
};
