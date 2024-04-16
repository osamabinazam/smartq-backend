const { Model, DataTypes } = require('sequelize');

/**
 * Location model function - Represents the location of a vendor in the system.
 * @param {*} sequelize - The Sequelize instance for connecting to the database.
 * @returns {Model} Location model definition.
 */
const LocationModel = (sequelize) => {

  /**
   * Represents the location of a vendor in the system.
   * @class Location
   * @extends Model
   */
  class Location extends Model {}

  /**
   * Initializes the Location model with predefined fields and options.
   * @returns {Model} Location model definition.
   * @constructor Location
   * @param {Object} fields - The fields to define the Location model.
   */
  Location.init({
    locationid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    address: { type: DataTypes.TEXT },
    city: { type: DataTypes.STRING(255) },
    state: { type: DataTypes.STRING(255) },
    postalcode: { type: DataTypes.STRING(20) },
    longitude: { type: DataTypes.FLOAT },
    latitude: { type: DataTypes.FLOAT }
  }, {
    sequelize,
    modelName: 'Location',
    tableName: 'locations',
    timestamps: true
  });

  return Location;
};

/**
 * Exports the Location model function.
 */
module.exports = LocationModel;
