import { Model, DataTypes } from 'sequelize';


/**
 *  Vendor Profile model function
 * @param {*} sequelize - The Sequelize instance for connecting to the database.
 * @returns  {Model} VendorProfile model definition.
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
 * @export VendorProfileModel
 */
export default VendorProfileModel;

