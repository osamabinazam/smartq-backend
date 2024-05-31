const { Model, DataTypes } = require('sequelize');

/**
 * Represents a queue in the system, managing its size, operational timings, and status.
 * Used by vendors to organize and schedule appointments.
 * @param {Sequelize} sequelize - The Sequelize instance for connecting to the database.
 * @returns {Model} The enhanced Queue model with additional details and functionalities.
 */
const QueueModel = (sequelize) => {

  /**
   * The Queue class represents a scheduling queue associated with a vendor,
   * tracking its current operational status and related appointments.
   */
  class Queue extends Model {}

  /**
   * Initializes the Queue model with comprehensive fields to fully describe each queue,
   * including its operational timing and status.
   */
  Queue.init({
    queueID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      comment: 'The unique identifier for the queue'
    },
    currentQueueSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      },
      comment: 'Current number of customers in the queue'
    },
    averageServiceTime: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: 'The average time in seconds that each customer spends in the queue'
    },
    queueStartTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'The scheduled start time for the queue'
    },
    queueEndTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'The scheduled end time for the queue'
    },
    queueStatus: {
      type: DataTypes.ENUM('active', 'inactive', 'completed'),
      allowNull: false,
      defaultValue: 'inactive',
      comment: 'The operational status of the queue'
    }
  }, {
    sequelize,
    modelName: 'Queue',
    tableName: 'queues',
    timestamps: true, // Ensure createdAt and updatedAt are managed by Sequelize
    comment: 'Manages all aspects of customer queues including scheduling and status tracking'
  });

  return Queue;
};

/**
 * Exports the enhanced Queue model, ready for integration with other parts of the application.
 */
module.exports = QueueModel;
