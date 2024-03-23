const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Request extends Model {}

  Request.init({
    requestID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    customerProfileID: { type: DataTypes.UUID, allowNull: false, references: { model: 'customer_profile', key: 'customerprofileid' } },
    vendorProfileID: { type: DataTypes.UUID, allowNull: false, references: { model: 'vendor_profile', key: 'vendorprofileid' } },
    serviceID: { type: DataTypes.UUID, allowNull: false, references: { model: 'service', key: 'serviceid' } },
    requestDateTime: { type: DataTypes.DATE, allowNull: false },
    additionalNotes: { type: DataTypes.TEXT }
  }, {
    sequelize,
    modelName: 'Request',
    tableName: 'request',
    timestamps: false
  });

  return Request;
};
