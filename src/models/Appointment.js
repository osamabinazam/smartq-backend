import { Model, DataTypes, Sequelize } from 'sequelize';

/**
 *  Appointment model function  - Represents an appointment in the system.
 * @param {Sequelize} sequelize  - The Sequelize instance for connecting to the database.
 * @returns  {Model} Appointment model definition.
 */  
const AppointmentModel = (sequelize) => {

  /**
   * Represents an appointment in the system.
   * @class Appointment
   * @extends Model - Sequelize Model Class
   */
  class Appointment extends Model {}

  /**
   * Initializes the Appointment model with predefined fields and options.
   * @returns {Model} Appointment model definition.
   * @param {Object} fields - The fields to define the Appointment model.
   * @constructor Appointment
   */
  Appointment.init({
    appointmentID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    appointmentDateTime: { type: DataTypes.DATE, allowNull: false },
    appointmentStatus: { type: DataTypes.ENUM('scheduled', 'completed', 'cancelled', 'rescheduled'), allowNull: false }
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    timestamps: true
 
});

return Appointment;
};

/**
 * Exports the Appointment model function.
 * @export AppointmentModel
 */
export default AppointmentModel;

