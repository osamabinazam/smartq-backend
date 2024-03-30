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
import ImageModel from './Image.js';


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
    ImageModel: ImageModel(sequelize)

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
db.sequelize.sync({force: false, alter:true})
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
db.UserModel.hasOne(db.CustomerProfileModel, { foreignKey: 'userid', as:'customer_profile' }, );
db.CustomerProfileModel.belongsTo(db.UserModel, { foreignKey: 'userid', as:'user' });

// User and VendorProfile
db.UserModel.hasOne(db.VendorProfileModel, { foreignKey: 'userid', as : 'vendor_profile'});
db.VendorProfileModel.belongsTo(db.UserModel, { foreignKey: 'userid' ,as: 'user' });

// User and Contact
db.UserModel.hasOne(db.ContactModel, { foreignKey: 'userid', as: 'contact' });
db.ContactModel.belongsTo(db.UserModel, { foreignKey: 'userid', as: 'user' });

// CustomerProfile and Queue
db.CustomerProfileModel.hasMany(db.QueueModel, { foreignKey: 'customerprofileid', as: 'queues' });
db.QueueModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerprofileid', as: 'customer_profile' });

// CustomerProfile and Appointment
db.CustomerProfileModel.hasMany(db.AppointmentModel, { foreignKey: 'customerprofileid', as: 'appointments' });
db.AppointmentModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerprofileid', as: 'customer_profile' });

// CustomerProfile and SearchHistory
db.CustomerProfileModel.hasMany(db.CustomerSearchHistoryModel, { foreignKey: 'customerprofileid', as: 'search_history' });
db.CustomerSearchHistoryModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerprofileid', as: 'customer_profile' });

// CustomerProfile and SearchPreferences
db.CustomerProfileModel.hasOne(db.CustomerSearchPreferencesModel, { foreignKey: 'customerprofileid', as: 'search_preferences' });
db.CustomerSearchPreferencesModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerprofileid', as: 'customer_profile' });

// CustomerProfile and Request (Note Customer can make multiple requests)
db.CustomerProfileModel.hasMany(db.RequestModel, { foreignKey: 'customerprofileid', as: 'requests' });
db.RequestModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerprofileid', as: 'customer_profile' });

// CustomerProfile and Image (Note Customer can have multiple images)
// db.CustomerProfileModel.hasMany(db.ImageModel, { foreignKey: 'customerprofileid', as: 'images' });
// db.ImageModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerprofileid', as: 'customer_profile' });

// VendorProfile and Request (Node Vendor can recieve multiple requests)
db.VendorProfileModel.hasMany(db.RequestModel, { foreignKey: 'vendorprofileid', as: 'requests' });
db.RequestModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

// VendorProfile and Category (Note Vendor can have multiple categories)
db.VendorProfileModel.hasMany(db.CategoryModel, { foreignKey: 'vendorprofileid', as: 'categories' });
db.CategoryModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

// VendorProfile and Location (Note Vendor can have multiple locations at different times or days)
db.VendorProfileModel.hasMany(db.LocationModel, { foreignKey: 'vendorprofileid', as: 'business_locations' });
db.LocationModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

// VendorProfile and OperatingHours (Note Vendor can have multiple operating hours at different times or days)
db.VendorProfileModel.hasMany(db.OperatingHoursModel, { foreignKey: 'vendorprofileid', as: 'operating_hours' });
db.OperatingHoursModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

// VendorProfile and Queue (Note Vendor can create one queue at a time but can have multiple queues in the future)
db.VendorProfileModel.hasMany(db.QueueModel, { foreignKey: 'vendorprofileid', as: 'queues' });
db.QueueModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

// VendorProfile and Service (Note Vendor can provide multiple services)
db.VendorProfileModel.hasMany(db.ServiceModel, { foreignKey: 'vendorprofileid', as: 'services' });
db.ServiceModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

// VendorProfile and SocialMedia (Note Vendor can have multiple social media accounts for their business profile)
db.VendorProfileModel.hasMany(db.SocialMediaModel, { foreignKey: 'vendorprofileid', as: 'socialMedia' });
db.SocialMediaModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

// VendorProfile and Education (Note Vendor can have multiple educational qualifications)
db.VendorProfileModel.hasMany(db.EducationModel, { foreignKey: 'vendorprofileid', as: 'educations' });
db.EducationModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

// VendorProfile and Appointment (Note Vendor can have multiple appointments)
db.VendorProfileModel.hasMany(db.AppointmentModel, { foreignKey: 'vendorprofileid', as: 'appointments' });
db.AppointmentModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

// VendorProfile and Image (Note Vendor can have multiple images)
// db.VendorProfileModel.hasMany(db.ImageModel, { foreignKey: 'vendorprofileid', as: 'images' });
// db.ImageModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

// // Category Self-Association (for parent/child categories)
db.CategoryModel.hasMany(db.CategoryModel, { as: 'Subcategories', foreignKey: 'parentcategoryid' });
db.CategoryModel.belongsTo(db.CategoryModel, { as: 'ParentCategory', foreignKey: 'parentcategoryid' });

// // Service and Category (Note Service can belong to one category and category can have multiple services)
db.CategoryModel.hasMany(db.ServiceModel, { foreignKey: 'categoryid', as: 'services'});
db.ServiceModel.belongsTo(db.CategoryModel, { foreignKey: 'categoryid', as: 'category'});

// Education and Certificate (Note Education can have one certificate)
db.CertificateModel.hasOne(db.EducationModel, { foreignKey: 'certificateid', as: 'education' });
db.EducationModel.belongsTo(db.CertificateModel, { foreignKey: 'certificateid', as: 'certificate' });



// Appointment and Service (Note Appointment can have one service)
db.ServiceModel.hasOne(db.AppointmentModel, { foreignKey: 'serviceid', as: 'appointment' });
db.AppointmentModel.belongsTo(db.ServiceModel, { foreignKey: 'serviceid', as: 'service' });


// Appointment and Queue (Note Appointment can have one queue)
db.QueueModel.hasOne(db.AppointmentModel, { foreignKey: 'queueid', as: 'appointment' });
db.AppointmentModel.belongsTo(db.QueueModel, { foreignKey: 'queueid', as: 'queue' });


// Appointment and Request (Note Appointment can have one request)
db.RequestModel.hasOne(db.AppointmentModel, { foreignKey: 'requestid', as: 'appointment' });
db.AppointmentModel.belongsTo(db.RequestModel, { foreignKey: 'requestid', as: 'request' });


// Request and Queue (Note Request can have one queue)
db.QueueModel.hasOne(db.RequestModel, { foreignKey: 'queueid', as: 'request' });
db.RequestModel.belongsTo(db.QueueModel, { foreignKey: 'queueid', as: 'queue' });


// Request and Service (Note Request can have one service)
db.ServiceModel.hasOne(db.RequestModel, { foreignKey: 'serviceid', as: 'request' });
db.RequestModel.belongsTo(db.ServiceModel, { foreignKey: 'serviceid', as: 'service' });


// Request and Category (Note Request can have one category)
db.CategoryModel.hasOne(db.RequestModel, { foreignKey: 'categoryid', as: 'request' });
db.RequestModel.belongsTo(db.CategoryModel, { foreignKey: 'categoryid', as: 'category' });


// Request and Location (Note Request can have one location)
db.LocationModel.hasOne(db.RequestModel, { foreignKey: 'locationid', as: 'request' });
db.RequestModel.belongsTo(db.LocationModel, { foreignKey: 'locationid', as: 'location' });


// Request and OperatingHours (Note Request can have one operating hours)
db.OperatingHoursModel.hasOne(db.RequestModel, { foreignKey: 'operatinghoursid', as: 'request' });
db.RequestModel.belongsTo(db.OperatingHoursModel, { foreignKey: 'operatinghoursid', as: 'operatingHours' });

// User and Image (Note User can have multiple images)
db.UserModel.hasMany(db.ImageModel, { foreignKey: 'userid', as: 'images' });
db.ImageModel.belongsTo(db.UserModel, { foreignKey: 'userid', as: 'user' });


/**
 * Export the db object
 * @export db
 */

export default db;



