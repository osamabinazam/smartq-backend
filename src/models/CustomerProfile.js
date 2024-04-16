const { Model, DataTypes } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
const CustomerProfileModel = (sequelize) => {

  /**
   * Represents a customer profile in the system.
   * @class CustomerProfile
   * @extends Model
   */
  class CustomerProfile extends Model {}

  /**
   * Initializes the CustomerProfile model with predefined fields and options.
   * @returns {Model} CustomerProfile model definition.
   * @param {Object} fields - The fields to define the CustomerProfile model.
   * @constructor CustomerProfile
   */
  CustomerProfile.init({
    customerprofileid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    firstname: { type: DataTypes.STRING(255), allowNull: false },
    lastname: { type: DataTypes.STRING(255), allowNull: false },
    emailaddress: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    dateofbirth: { type: DataTypes.DATEONLY },
  }, {
    sequelize,
    modelName: 'CustomerProfile',
    tableName: 'customer_profiles',
    timestamps: true
  });

  return CustomerProfile;
};


/**
 * Exports the CustomerProfile model function.
 */
module.exports = CustomerProfileModel;
