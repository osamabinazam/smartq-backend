const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Service extends Model {}

  Service.init({
    serviceid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    categoryid: { type: DataTypes.UUID, allowNull: false, references: { model: 'category', key: 'categoryid' } },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.NUMERIC(10, 2) }
  }, {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: false
  });

  return Service;
};
