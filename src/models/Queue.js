const { Model, DataTypes } = require('sequelize');

/**
 * Queue model function - Represents a queue in the system.
 * @param {*} sequelize - The Sequelize instance for connecting to the database.
 * @returns {Model} Queue model definition.
 */
const QueueModel = (sequelize) => {

  /**
   * Represents a queue in the system.
   * @class Queue
   * @extends Model
   */
  class Queue extends Model {}

  /**
   * Initializes the Queue model with predefined fields and options.
   * @returns {Model} Queue model definition.
   * @constructor Queue
   * @param {Object} fields - The fields to define the Queue model.
   */
  Queue.init({
    queueID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    currentQueueSize: { type: DataTypes.INTEGER, allowNull: false },
    averageServiceTime: { type: DataTypes.BIGINT },
    queueStartTime: { type: DataTypes.TIME },
    queueEndTime: { type: DataTypes.TIME },
    queueStatus: { type: DataTypes.ENUM('active', 'inactive', 'completed'), allowNull: false }   // Add Status
  }, {
    sequelize,
    modelName: 'Queue',
    tableName: 'queues',
    timestamps: true
  });

  return Queue;
};

/**
 * Exports the Queue model function.
 */
module.exports = QueueModel;
