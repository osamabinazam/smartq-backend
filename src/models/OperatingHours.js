import { Model, DataTypes } from 'sequelize';

/**
 *  OperatingHours model function  - Represents the operating hours of a vendor in the system.
 * @param {*} sequelize  - The Sequelize instance for connecting to the database.
 * @returns  {Model} OperatingHours model definition.
 */
const OperatingHoursModel = (sequelize) => {

  /**
   * Represents the operating hours of a vendor in the system.
   */
  class OpeningHours extends Model {}

  /**
   * Initializes the OperatingHours model with predefined fields and options.
   * @returns {Model} OperatingHours model definition.
   * @param {Object} fields - The fields to define the OperatingHours model.
   * @constructor OperatingHours
   */
  OpeningHours.init({
    openinghoursid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    weekday: { type: DataTypes.STRING(10) },
    opentime: { type: DataTypes.TIME },
    closetime: { type: DataTypes.TIME },
    isclosed: { type: DataTypes.BOOLEAN }
  }, {
    sequelize,
    modelName: 'OpeningHours',
    tableName: 'opening_hours',
    timestamps: true
  });

  return OpeningHours;
};


/**
 * Exports the OperatingHours model function.
 * @export OperatingHoursModel
 */
export default OperatingHoursModel;
