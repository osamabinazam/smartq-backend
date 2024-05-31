const { Model, DataTypes, Sequelize } = require('sequelize');

/**
 * Represents an appointment in the system, linked to specific queues and capturing
 * key timeline metrics for start and end times to calculate durations and manage statuses.
 * @param {Sequelize} sequelize - The Sequelize instance for connecting to the database.
 * @returns {Model} Appointment model definition.
 */
const AppointmentModel = (sequelize) => {

  /**
   * Represents an appointment in the system, capturing all necessary details for scheduling
   * and tracking its lifecycle.
   */
  class Appointment extends Model {}

  /**
   * Initializes the Appointment model with predefined fields and options including relationships.
   */
  Appointment.init({
    appointmentID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      comment: 'Unique identifier for the appointment'
    },
    appointmentDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: 'Scheduled datetime for the appointment'
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Actual start time of the appointment'
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Actual end time of the appointment'
    },
    appointmentStatus: {
      type: DataTypes.ENUM('scheduled', 'completed', 'cancelled', 'rescheduled'),
      allowNull: false,
      defaultValue: 'scheduled',
      comment: 'Status of the appointment reflecting its current lifecycle state'
    }
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
    comment: 'Stores all appointments and their statuses along with timing details'
  });

  return Appointment;
};

/**
 * Exports the Appointment model function for use in other parts of the application.
 */
module.exports = AppointmentModel;
