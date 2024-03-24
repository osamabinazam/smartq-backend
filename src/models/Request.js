import { Model, DataTypes } from 'sequelize';


/**
 *  Request model function  - Represents a request in the system.
 * @param {*} sequelize  - The Sequelize instance for connecting to the database.
 * @returns  {Model} Request model definition.
 */ 
const RequestModel = (sequelize) => {

  /**
   * Represents a request in the system. 
   */
  class Request extends Model {}

  /**
   * Initializes the Request model with predefined fields and options. 
   * @returns {Model} Request model definition.
   * @param {Object} fields - The fields to define the Request model.
   * @constructor Request
   */
  Request.init({
    requestID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    requestDateTime: { type: DataTypes.DATE, allowNull: false },
    additionalNotes: { type: DataTypes.TEXT }
  }, {
    sequelize,
    modelName: 'Request',
    tableName: 'requests',
    timestamps: true
  });

  return Request;
};

/**
 * Exports the Request model function.
 * @export RequestModel
 */
export default RequestModel;
