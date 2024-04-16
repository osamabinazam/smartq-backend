const { Model, DataTypes } = require('sequelize');

/**
 *  OperatingHours model function  - Represents the operating hours of a vendor in the system.
 * @param {*} sequelize  - The Sequelize instance for connecting to the database.
 * @returns  {Model} OperatingHours model definition.
 */
const OperatingHourModel = (sequelize) => {

  /**
   * Represents the operating hours of a vendor in the system.
   */
  class OperatingHour extends Model {}

  /**
   * Initializes the OperatingHours model with predefined fields and options.
   * @returns {Model} OperatingHours model definition.
   * @param {Object} fields - The fields to define the OperatingHours model.
   * @constructor OperatingHours
   */
  OperatingHour.init({
    openinghoursid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    weekday: { type: DataTypes.STRING(10) },
    opentime: { type: DataTypes.TIME },
    closetime: { type: DataTypes.TIME },
    isclosed: { type: DataTypes.BOOLEAN }
  }, {
    sequelize,
    modelName: 'OperatingHour',
    tableName: 'opening_hours',
    timestamps: true
  });

  return OperatingHour;
};


/**
 * Exports the OperatingHours model function.
 */
module.exports = OperatingHourModel;
