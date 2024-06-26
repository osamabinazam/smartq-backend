const { Model, DataTypes } = require('sequelize');

/**
 * Vendor Profile model function
 * @param {*} sequelize - The Sequelize instance for connecting to the database.
 * @returns {Model} VendorProfile model definition.
 */
const VendorProfileModel = (sequelize) => {

  /**
   * Represents a vendor profile in the system.
   */
  class VendorProfile extends Model {}

  /**
   * Initializes the VendorProfile model with predefined fields and options.
   * @type {Model}
   * @returns VendorProfile
   * @constructor VendorProfile
   * @param {Object} fields - The fields to define the VendorProfile model.
   */
  VendorProfile.init({
    vendorprofileid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    businessname: { type: DataTypes.STRING(255) },
    businesstype: { type: DataTypes.STRING(255) },
    // businesstype: { 
    //   type: DataTypes.ENUM,
    //   values: ['Retail', 'Wholesale', 'Manufacturing', 'Services', 'Healthcare', 'Banking', 'Government', 'Education', 'Restaurants', 'Entertainment', 'Transportation', 'Telecommunications', 'Utilities', 'Hospitality', 'Pharmacy', 'Post Office', 'Others'], // Updated enum values
    //   allowNull: false,
    // },
    // otherbusinesstype: {
    //   type: DataTypes.STRING(255),
    //   allowNull: true,
    //   validate: {
    //     customValidator(value) {
    //       if (this.businesstype === 'Others' && !value) {
    //         throw new Error('otherbusinesstype is required if businesstype is Others');
    //       }
    //     }
    //   }
    // },
    bio: { type: DataTypes.TEXT },
    dob: { type: DataTypes.DATEONLY },
  }, {
    sequelize,
    modelName: 'VendorProfile',
    tableName: 'vendor_profiles',
    timestamps: true
  });

  return VendorProfile;
};

/**
 * Exports the VendorProfile model function.
 */
module.exports = VendorProfileModel;
