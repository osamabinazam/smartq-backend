const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Queue extends Model {}

  Queue.init({
    queueID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    vendorProfileID: { type: DataTypes.UUID, allowNull: false, references: { model: 'vendor_profile', key: 'vendorprofileid' } },
    currentQueueSize: { type: DataTypes.INTEGER, allowNull: false },
    averageServiceTime: { type: DataTypes.INTERVAL },
    queueStartTime: { type: DataTypes.TIME },
    queueEndTime: { type: DataTypes.TIME }
  }, {
    sequelize,
    modelName: 'Queue',
    tableName: 'queue',
    timestamps: false
  });

  return Queue;
};
