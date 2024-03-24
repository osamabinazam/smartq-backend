import { Model, DataTypes } from 'sequelize';

/**
 *  Service model function  - Represents a service in the system. 
 * @param {*} sequelize  - The Sequelize instance for connecting to the database.
 * @returns  {Model} Service model definition.
 */
const ServiceModel = (sequelize) => {

  /**
   * Represents a service in the system.
   */
  class Service extends Model {}

  /**
   * Initializes the Service model with predefined fields and options.
   * @returns {Model} Service model definition.
   * @param {Object} fields - The fields to define the Service model.
   * @constructor Service
   */
  Service.init({
    serviceid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    // categoryid: { type: DataTypes.UUID, allowNull: false, references: { model: 'category', key: 'categoryid' } },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.NUMERIC(10, 2) }
  }, {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true
  });

  return Service;
};


/**
 * Exports the Service model function.
 * @export ServiceModel
 */
export default ServiceModel;
