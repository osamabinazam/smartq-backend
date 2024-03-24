import sequelize from '../db/dbConnection.js';
import { DataTypes, Sequelize } from 'sequelize';


/**
 * Importing the models from their respective files
 */
import AppointmentModel from './Appointment.js';
import CategoryModel from './Category.js';
import EducationModel from './Education.js';
import CertificateModel from './Certificate.js';
import ContactModel from './Contact.js';
import CustomerProfileModel from './CustomerProfile.js';
import CustomerSearchHistoryModel from './CustomerSearchHistory.js';
import CustomerSearchPreferencesModel from './CustomerSearchPreference.js';

import LocationModel from './Location.js';
import OperatingHoursModel from './OperatingHours.js';
import QueueModel from './Queue.js';
import RequestModel from './Request.js';
import ServiceModel from './Service.js';
import SocialMediaModel from './SocialMedia.js';
import UserModel from './User.js';
import VendorProfileModel from './VendorProfile.js';


/**
 * db object contains all the models and the sequelize instance for the database connection 
 */
const db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    AppointmentModel: AppointmentModel(sequelize),
    CategoryModel: CategoryModel(sequelize),
    CertificateModel: CertificateModel(sequelize),
    ContactModel: ContactModel(sequelize),
    CustomerProfileModel: CustomerProfileModel(sequelize),
    CustomerSearchHistoryModel: CustomerSearchHistoryModel(sequelize),
    CustomerSearchPreferencesModel: CustomerSearchPreferencesModel(sequelize),
    EducationModel: EducationModel(sequelize),
    LocationModel: LocationModel(sequelize),
    OperatingHoursModel: OperatingHoursModel(sequelize),
    QueueModel: QueueModel(sequelize),
    RequestModel: RequestModel(sequelize),
    ServiceModel: ServiceModel(sequelize),
    SocialMediaModel: SocialMediaModel(sequelize),
    UserModel: UserModel(sequelize),
    VendorProfileModel: VendorProfileModel(sequelize),

};

/**
 * Authenticate the connection to the database
 */
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

/**
 * Synchronize the models with the database
 */
db.sequelize.sync({ force: true })
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('Unable to synchronize the models with the database:', error);
    });


    
/**
 * Define the relationships between the models here 
 */

// User and CustomerProfile
db.UserModel.hasOne(db.CustomerProfileModel, { foreignKey: 'userid' });
db.CustomerProfileModel.belongsTo(db.UserModel, { foreignKey: 'userid' });

// User and VendorProfile
db.UserModel.hasOne(db.VendorProfileModel, { foreignKey: 'userid' });
db.VendorProfileModel.belongsTo(db.UserModel, { foreignKey: 'userid' });


// Category Self-Association (for parent/child categories)
db.CategoryModel.hasMany(db.CategoryModel, { as: 'Subcategories', foreignKey: 'parentcategoryid' });
db.CategoryModel.belongsTo(db.CategoryModel, { as: 'ParentCategory', foreignKey: 'parentcategoryid' });

// VendorProfile Associations
db.VendorProfileModel.hasMany(db.SocialMediaModel, { foreignKey: 'vendorid' });
db.VendorProfileModel.hasOne(db.ContactModel, { foreignKey: 'contactid' });
db.VendorProfileModel.hasMany(db.ServiceModel, { foreignKey: 'vendorProfileID' });
db.VendorProfileModel.hasMany(db.QueueModel, { foreignKey: 'vendorProfileID' });
db.VendorProfileModel.hasMany(db.AppointmentModel, { foreignKey: 'vendorProfileID' });
db.VendorProfileModel.hasMany(db.EducationModel, { foreignKey: 'educationid' }); // If a vendor can have multiple educations
db.VendorProfileModel.belongsTo(db.LocationModel, { foreignKey: 'locationid' });
db.VendorProfileModel.belongsTo(db.OperatingHoursModel, { foreignKey: 'openinghoursid' });

// Education and Certificate
db.EducationModel.belongsTo(db.CertificateModel, { foreignKey: 'certificateid' });

// Service and Category
db.ServiceModel.belongsTo(db.CategoryModel, { foreignKey: 'categoryid' });

// Appointment Associations
db.AppointmentModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerProfileID' });
db.AppointmentModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorProfileID' });
db.AppointmentModel.belongsTo(db.ServiceModel, { foreignKey: 'serviceID' });
db.AppointmentModel.belongsTo(db.QueueModel, { foreignKey: 'queueID' });

// Queue and VendorProfile
db.QueueModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorProfileID' });

// SocialMedia and VendorProfile
db.SocialMediaModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorid' });

// Contact and VendorProfile (assuming a contact belongs to a vendor)
db.ContactModel.belongsTo(db.VendorProfileModel, { foreignKey: 'userid' });

// Request Model Associations (assuming it exists between customers and services)
db.RequestModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerProfileID' });
db.RequestModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorProfileID' });
db.RequestModel.belongsTo(db.ServiceModel, { foreignKey: 'serviceID' });






/**
 * Export the db object
 * @export db
 */

export default db;



