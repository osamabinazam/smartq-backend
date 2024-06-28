const db = require('../models/index.js');

const VendorProfileModel = db.VendorProfileModel;
const CustomerProfileModel = db.CustomerProfileModel;
const Service = db.ServiceModel;
const UserModel = db.UserModel;
const ContactModel = db.ContactModel;
const sequelize = db.sequelize;

/*********************************************************************************************
 * ************ Vendor Profile Services ******************************************************
 * ******************************************************************************************
 */

const createVendorProfile = async (vendorProfile) => {
    try {
        return await VendorProfileModel.create(vendorProfile);
    } catch (error) {
        console.error("Error creating vendor profile:", error);
        throw new Error("Failed to create vendor profile.");
    }
}

const getVendorProfileById = async (vendorProfileId) => {
    try {
        return await VendorProfileModel.findByPk(vendorProfileId, { 
            include: ['services', 'educations', 'operating_hours']
        });
    } catch (error) {
        console.error("Error fetching vendor profile:", error);
        throw new Error("Failed to fetch vendor profile.");
    }
}

const updateVendorProfile = async (vendorProfileId, userDetails, vendorDetails, contactDetails, userid, isCreate) => {
    try {
        const transaction = await sequelize.transaction();
        const [updatedRows] = await VendorProfileModel.update(vendorDetails, 
            { 
                where: { vendorprofileid: vendorProfileId },
                returning: true,
                plain: true,
                transaction
        });
        if (updatedRows === 0) {
            throw new Error("Vendor Profile not found or nothing to update.");
        }else{
            console.log("Successfully Updated Vendor Profile")
        }

        // Update User
        const [updatedUserRows] = await UserModel.update(userDetails, 
            { 
                where: { userid: userid },
                returning: true,
                plain: true,
                transaction
        });
        if (updatedUserRows === 0) {
            throw new Error("User not found or nothing to update.");
        }else{
            console.log("Successfully Updated User")
        }

        // Conditional Create of Contact
        if(isCreate){
            contactDetails.userid = userid;
            const contact = await ContactModel.create(contactDetails, {
                returning: true,
                plain: true,
                transaction
            });
            
            if (!contact) {
                throw new Error("Failed to create contact.");
            }else{
                console.log("Successfully Created Contact")
            }
        }else{
            // Update Contact
            const [updatedContactRows] = await ContactModel.update(contactDetails, {
                where: { userid: userid },
                returning: true,
                plain: true,
                transaction
            });
            if (updatedContactRows === 0) {
                throw new Error("Contact not found or nothing to update.");
            }else{
                console.log("Successfully Updated Contact")
            }
        }

        console.log("Committing Transaction")
        await transaction.commit();

        return updatedRows;
    } catch (error) {
        console.error("Error updating vendor profile:", error);
        throw error;
    }
}

const deleteVendorProfile = async (vendorProfileId) => {
    try {
        const deletedRows = await VendorProfileModel.destroy({ where: { vendorprofileid: vendorProfileId } });
        if (deletedRows === 0) {
            throw new Error("Vendor Profile not found.");
        }
        return deletedRows;
    } catch (error) {
        console.error("Error deleting vendor profile:", error);
        throw error;
    }
}

const getAllVendorProfiles = async () => {
    try {
        return await VendorProfileModel.findAll({
            include: ['services', 'educations', 'operating_hours', 'social_media', 'business_locations']
        });
    } catch (error) {
        console.error("Error fetching vendor profiles:", error);
        throw new Error("Failed to fetch vendor profiles.");
    }
}

const getAllNearbyVendors = async (latitude, longitude, radius) => {
    try {
        return await VendorProfileModel.findAll({
            include: [{
                model: db.LocationModel,
                as: 'business_locations', // assuming 'Locations' is the alias in the association
                where: db.sequelize.where(
                    db.sequelize.fn(
                        'ST_DWithin',
                        db.sequelize.col('geolocation'), // Assuming 'geolocation' is the actual geographic column
                        db.sequelize.fn('ST_MakePoint', longitude, latitude),
                        radius
                    ),
                    true
                )
            }, 'services','operating_hours']
        });



    } catch (error) {
        console.error("Error fetching nearby vendors:", error);
        throw new Error("Failed to fetch nearby vendors.");
    }
}




/********************************************************************************************
 * ************ Customer Profile Services ***************************************************
 * ******************************************************************************************
 */

const createCustomerProfile = async (customerProfile) => {
    try {
        return await CustomerProfileModel.create(customerProfile);
    } catch (error) {
        console.error("Error creating customer profile:", error);
        throw new Error("Failed to create customer profile.");
    }
}

const getCustomerProfileById = async (customerProfileId) => {
    try {
        return await CustomerProfileModel.findByPk(customerProfileId,{
            include: ['user', 'appointments' ]
        });
    } catch (error) {
        console.error("Error fetching customer profile:", error);
        throw new Error("Failed to fetch customer profile.");
    }
}

const updateCustomerProfile = async (customerProfileId, customerProfileDetails) => {
    try {
        const [updatedRows] = await CustomerProfileModel.update(customerProfileDetails, { where: { customerprofileid: customerProfileId }},{
            include: 'user'
        } );
        if (updatedRows === 0) {
            throw new Error("Customer Profile not found or nothing to update.");
        }
        return updatedRows;
    } catch (error) {
        console.error("Error updating customer profile:", error);
        throw error;
    }
}

const deleteCustomerProfile = async (customerProfileId) => {
    try {
        const deletedRows = await CustomerProfileModel.destroy({ where: { customerprofileid: customerProfileId } });
        if (deletedRows === 0) {
            throw new Error("Customer Profile not found.");
        }
        return deletedRows;
    } catch (error) {
        console.error("Error deleting customer profile:", error);
        throw error;
    }
}

const getAllCustomerProfiles = async () => {
    try {
        // return await CustomerProfileModel.findAll( {
        //     include:[ 'user', 'appointments']
        
        // } );
        return await CustomerProfileModel.findAll({
            attributes: { 
                exclude: ['userid','createdAt', 'updatedAt'] // Add attributes you want to exclude
            },
            include: [
                {
                    association: 'user',
                    attributes: { 
                        exclude: ['password', 'createdAt', 'updatedAt'] // Exclude sensitive and unnecessary attributes
                    }
                },
                {
                    association: 'appointments',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'] // Exclude if not needed
                    }
                }
            ]
        });
    } catch (error) {
        console.error("Error fetching customer profiles:", error);
        throw new Error("Failed to fetch customer profiles.");
    }
}


/** 
 *  Get vendor  by user id
 * @param {*} userId 
 * @returns 
 */
const getVendorProfileByUserId = async (userId) => {
    try {
        const vendorProfile = await VendorProfileModel.findOne({
            where: { userid: userId },
            attributes: ['vendorprofileid', 'businessname', 'businesstype', 'bio'], // Include only essential fields from VendorProfile
            include: [
                {
                    model: db.UserModel,
                    as: 'user',
                    attributes: ['userid', 'username', 'email'], // Include only essential fields from User
                    include: [
                        {
                            model: db.ContactModel,
                            as: 'contact',
                            attributes: ['phone', 'address', 'city', 'state', 'country'] // Include only essential fields from Contact
                        }
                    ]
                },
                {
                    model: db.ServiceModel,
                    as: 'services',
                    attributes: ['serviceid','description' ,'name', 'price', 'categoryid'] // Include only essential fields from Service
                },
                {
                    model: db.EducationModel,
                    as: 'educations',
                    attributes: ['educationid', 'school', 'degree', 'startAt', 'endAt'] // Include only essential fields from Education
                },
                {
                    model: db.OperatingHourModel,
                    as: 'operating_hours',
                    attributes: ['openinghoursid', 'weekday', 'opentime', 'closetime', 'isclosed'] // Include only essential fields from OperatingHour
                },
                {
                    model: db.SocialMediaModel,
                    as: 'social_media',
                    attributes: ['socialmediaid', 'platform', 'link'] // Include only essential fields from SocialMedia
                },
                {
                    model: db.LocationModel,
                    as: 'business_locations',
                    attributes: ['locationid', 'address', 'city', 'state', 'postalcode', 'latitude', 'longitude'] // Include only essential fields from Location
                }
            ]
        });

        if (!vendorProfile) {
            throw new Error('Vendor profile not found.');
        }

        // Construct a simplified response object
        const response = {
            vendorprofileid: vendorProfile.vendorprofileid,
            businessname: vendorProfile.businessname,
            businesstype: vendorProfile.businesstype,
            bio: vendorProfile.bio,
            user: {
                userid: vendorProfile.user.userid,
                username: vendorProfile.user.username,
                email: vendorProfile.user.email,
                contact: vendorProfile.user.contact
            },
            services: vendorProfile.services,
            educations: vendorProfile.educations,
            operating_hours: vendorProfile.operating_hours,
            social_media: vendorProfile.social_media,
            business_locations: vendorProfile.business_locations
        };

        return response;
    } catch (error) {
        console.error("Error fetching vendor profile:", error);
        throw new Error("Failed to fetch vendor profile.");
    }
};




/**
 *  Get customer profile by user id 
 * @param {*} userId 
 * @returns 
 */

const getCustomerProfileByUserId = async (userId) => {
    try {
        return await CustomerProfileModel.findOne({
            where: { userid: userId },
            include: [
                {
                    model: UserModel,
                    as: 'user',
                    include: [
                        {
                            model: ContactModel,
                            as: 'contact',
                        },
                    ],
                },
                'appointments',
            ],
        });
    } catch (error) {
        console.error("Error fetching customer profile:", error);
        throw new Error("Failed to fetch customer profile.");
    }
};





/********************************************************************************************
 * ************ Export Profile Services ******************************************************
 * ******************************************************************************************
 */

module.exports = {
    createVendorProfile, 
    getVendorProfileById,
    updateVendorProfile,
    deleteVendorProfile,
    getAllVendorProfiles,
    getVendorProfileByUserId,
    createCustomerProfile,
    getCustomerProfileById,
    updateCustomerProfile,
    deleteCustomerProfile,
    getAllCustomerProfiles,
    getCustomerProfileByUserId,
    getAllNearbyVendors
};
