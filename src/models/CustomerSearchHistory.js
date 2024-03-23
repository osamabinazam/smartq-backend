const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CustomerSearchHistory extends Model {}

  CustomerSearchHistory.init({
    searchID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    customerProfileID: { type: DataTypes.UUID, allowNull: false, references: { model: 'customer_profile', key: 'customerprofileid' } },
    searchParameters: { type: DataTypes.JSONB },
    searchDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    sequelize,
    modelName: 'CustomerSearchHistory',
    tableName: 'customer_search_history',
    timestamps: false
  });

  return CustomerSearchHistory;
};
