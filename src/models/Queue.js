import { Model, DataTypes } from 'sequelize';

/**
 *  Queue model function  - Represents a queue in the system.
 * @param {*} sequelize 
 * @returns  {Model} Queue model definition.
 */
const QueueModel = (sequelize) => {

  /**
   * Represents a queue in the system.
   */
  class Queue extends Model {}

  /**
   * Initializes the Queue model with predefined fields and options. 
   * @returns {Model} Queue model definition.
   * @param {Object} fields - The fields to define the Queue model.
   * @constructor Queue
   */
  Queue.init({
    queueID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    // vendorProfileID: { type: DataTypes.UUID, allowNull: false, references: { model: 'vendor_profile', key: 'vendorprofileid' } },
    currentQueueSize: { type: DataTypes.INTEGER, allowNull: false },
    averageServiceTime: { type: DataTypes.INTERVAL },
    queueStartTime: { type: DataTypes.TIME },
    queueEndTime: { type: DataTypes.TIME }
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
 * @module QueueModel
 */
export default QueueModel;