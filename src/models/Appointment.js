const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Appointment extends Model {}

  Appointment.init({
    appointmentID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    customerProfileID: { type: DataTypes.UUID, allowNull: false, references: { model: 'customer_profile', key: 'customerprofileid' } },
    vendorProfileID: { type: DataTypes.UUID, allowNull: false, references: { model: 'vendor_profile', key: 'vendorprofileid' } },
    queueID: { type: DataTypes.UUID, references: { model: 'queue', key: 'queueID' } },
    serviceID: { type: DataTypes.UUID, allowNull: false, references: { model: 'service', key: 'serviceid' } },
    appointmentDateTime: { type: DataTypes.DATE, allowNull: false },
    appointmentStatus: { type: DataTypes.ENUM('scheduled', 'completed', 'cancelled', 'rescheduled'), allowNull: false }
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointment',
    timestamps: false
 
});

return Appointment;
};
