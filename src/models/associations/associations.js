/**
 * Sets up all model associations.
 * @param {Object} db - An object containing all Sequelize models.
 */
const setupAssociations = (db) => {

    // User and CustomerProfile
    db.UserModel.hasOne(db.CustomerProfileModel, { foreignKey: 'userid', as: 'customer_profile' });
    db.CustomerProfileModel.belongsTo(db.UserModel, { foreignKey: 'userid', as: 'user' });

    // User and VendorProfile
    db.UserModel.hasOne(db.VendorProfileModel, { foreignKey: 'userid', as: 'vendor_profile' });
    db.VendorProfileModel.belongsTo(db.UserModel, { foreignKey: 'userid', as: 'user' });

    // User and Contact
    db.UserModel.hasOne(db.ContactModel, { foreignKey: 'userid', as: 'contact' });
    db.ContactModel.belongsTo(db.UserModel, { foreignKey: 'userid', as: 'user' });

    // CustomerProfile and Queue
    db.CustomerProfileModel.hasMany(db.QueueModel, { foreignKey: 'customerprofileid', as: 'queues' });
    db.QueueModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerprofileid', as: 'customer_profile' });

    // CustomerProfile and Appointment
    db.CustomerProfileModel.hasMany(db.AppointmentModel, { foreignKey: 'customerprofileid', as: 'appointments' });
    db.AppointmentModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerprofileid', as: 'customer_profile' });

    // CustomerProfile and SearchHistory (Note Customer can have multiple search history)
    db.CustomerProfileModel.hasMany(db.CustomerSearchHistoryModel, { foreignKey: 'customerprofileid', as: 'search_history' });
    db.CustomerSearchHistoryModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerprofileid', as: 'customer_profile' });

    // CustomerProfile and SearchPreferences
    db.CustomerProfileModel.hasOne(db.CustomerSearchPreferencesModel, { foreignKey: 'customerprofileid', as: 'search_preferences' });
    db.CustomerSearchPreferencesModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerprofileid', as: 'customer_profile' });

    // CustomerProfile and Request (Note Customer can make multiple requests)
    db.CustomerProfileModel.hasMany(db.RequestModel, { foreignKey: 'customerprofileid', as: 'requests' });
    db.RequestModel.belongsTo(db.CustomerProfileModel, { foreignKey: 'customerprofileid', as: 'customer_profile' });

    // VendorProfile and Request (Node Vendor can recieve multiple requests)
    db.VendorProfileModel.hasMany(db.RequestModel, { foreignKey: 'vendorprofileid', as: 'requests' });
    db.RequestModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

    // // VendorProfile and Category (Note Vendor can have multiple categories)
    // db.VendorProfileModel.hasMany(db.CategoryModel, { foreignKey: 'vendorprofileid', as: 'categories' });
    // db.CategoryModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

    // VendorProfile and Location (Note Vendor can have multiple locations at different times or days)
    db.VendorProfileModel.hasMany(db.LocationModel, { foreignKey: 'vendorprofileid', as: 'business_locations' });
    db.LocationModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

    // VendorProfile and OperatingHours (Note Vendor can have multiple operating hours at different times or days)
    db.VendorProfileModel.hasMany(db.OperatingHourModel, { foreignKey: 'vendorprofileid', as: 'operating_hours' });
    db.OperatingHourModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

    // VendorProfile and Queue (Note Vendor can create one queue at a time but can have multiple queues in the future)
    db.VendorProfileModel.hasMany(db.QueueModel, { foreignKey: 'vendorprofileid', as: 'queues' });
    db.QueueModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

    // VendorProfile and Service (Note Vendor can have multiple services and service can be provided by multiple vendors)
   // Define the many-to-many relationship between VendorProfileModel and ServiceModel
db.VendorProfileModel.belongsToMany(db.ServiceModel, {
    through: 'VendorService', // Name of the join table
    foreignKey: 'vendorprofileid', // Foreign key in the join table for VendorProfileModel
    otherKey: 'serviceid', // Foreign key in the join table for ServiceModel
    as: 'services', // Alias for the association
    // through: { model: db.VendorService, unique: false, timestamps: false } 

  });
  
  db.ServiceModel.belongsToMany(db.VendorProfileModel, {
    through: 'VendorService', // Name of the join table
    foreignKey: 'serviceid', // Foreign key in the join table for ServiceModel
    otherKey: 'vendorprofileid', // Foreign key in the join table for VendorProfileModel
    as: 'vendors', // Alias for the association
    // through: { model: db.VendorService, unique: false, timestamps: false }
  });
    // VendorProfile and SocialMedia (Note Vendor can have multiple social media accounts for their business profile)
    db.VendorProfileModel.hasMany(db.SocialMediaModel, { foreignKey: 'vendorprofileid', as: 'social_media' });
    db.SocialMediaModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

    // VendorProfile and Education (Note Vendor can have multiple educational qualifications)
    db.VendorProfileModel.hasMany(db.EducationModel, { foreignKey: 'vendorprofileid', as: 'educations' });
    db.EducationModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });

    // VendorProfile and Appointment (Note Vendor can have multiple appointments)
    db.VendorProfileModel.hasMany(db.AppointmentModel, { foreignKey: 'vendorprofileid', as: 'appointments' });
    db.AppointmentModel.belongsTo(db.VendorProfileModel, { foreignKey: 'vendorprofileid', as: 'vendor_profile' });


    // // Category Self-Association (for parent/child categories)
    db.CategoryModel.hasMany(db.CategoryModel, { as: 'Subcategories', foreignKey: 'parentcategoryid' });
    db.CategoryModel.belongsTo(db.CategoryModel, { as: 'ParentCategory', foreignKey: 'parentcategoryid' });

    // // Service and Category (Note Service can belong to one category and category can have multiple services)
    db.CategoryModel.hasMany(db.ServiceModel, { foreignKey: 'categoryid', as: 'services' });
    db.ServiceModel.belongsTo(db.CategoryModel, { foreignKey: 'categoryid', as: 'category' });

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
    db.OperatingHourModel.hasOne(db.RequestModel, { foreignKey: 'operatinghoursid', as: 'request' });
    db.RequestModel.belongsTo(db.OperatingHourModel, { foreignKey: 'operatinghoursid', as: 'operatingHours' });

    // User and Image (Note User can have multiple images)
    db.UserModel.hasMany(db.ImageModel, { foreignKey: 'userid', as: 'images' });
    db.ImageModel.belongsTo(db.UserModel, { foreignKey: 'userid', as: 'user' });

   
   // Queue and Servide (Note: Service can have multiple queues)
    db.ServiceModel.hasMany(db.QueueModel, { foreignKey: 'serviceid', as: 'queues' });
    db.QueueModel.belongsTo(db.ServiceModel, { foreignKey: 'serviceid' , as: 'services' });

};

module.exports = setupAssociations;
