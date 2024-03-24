import { Model, DataTypes, Sequelize } from 'sequelize';

/**
 *  CustomerSearchHistory model function  - Represents the search history of a customer in the system.
 * @param {Sequelize} sequelize  - The Sequelize instance for connecting to the database.
 * @returns  {Model} CustomerSearchHistory model definition.
 */
const CustomerSearchHistoryModel = (sequelize) => {

  /**
   * Represents the search history of a customer in the system.
   * @class CustomerSearchHistory
   * @extends Model
   */
  class CustomerSearchHistory extends Model { }


  /**
   * Initializes the CustomerSearchHistory model with predefined fields and options.
   * @returns {Model} CustomerSearchHistory model.
   * @constructor CustomerSearchHistory
   * @param {Object} fields - The fields to define the CustomerSearchHistory model.
   */
  CustomerSearchHistory.init({
    searchID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    customerProfileID: { type: DataTypes.UUID, allowNull: false, references: { model: 'customer_profile', key: 'customerprofileid' } },
    searchParameters: { type: DataTypes.JSONB },
    searchDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    sequelize,
    modelName: 'CustomerSearchHistory',
    tableName: 'customer_search_history',
    timestamps: true
  });

  return CustomerSearchHistory;
};



/**
 * Exports the CustomerSearchHistory model function.
 * @export CustomerSearchHistoryModel
 */
export default CustomerSearchHistoryModel;
