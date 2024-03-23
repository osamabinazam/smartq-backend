const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CustomerSearchPreferences extends Model {}

  CustomerSearchPreferences.init({
    preferenceID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    customerProfileID: { type: DataTypes.UUID, allowNull: false, references: { model: 'customer_profile', key: 'customerprofileid' } },
    searchRadius: { type: DataTypes.INTEGER },
    preferredCategories: { type: DataTypes.TEXT },
    preferredPriceRange: { type: DataTypes.NUMERIC },
    preferredRating: { type: DataTypes.DECIMAL(2, 1) },
    lastSearch: { type: DataTypes.DATE }
  }, {
    sequelize,
    modelName: 'CustomerSearchPreferences',
    tableName: 'customer_search_preferences',
    timestamps: false
  });

  return CustomerSearchPreferences;
};
