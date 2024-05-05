const { Model, DataTypes } = require('sequelize');

/**
 * Defines the OTP model using Sequelize.
 * @param {*} sequelize - The Sequelize instance for connecting to the database.
 * @returns {Model} OTP model definition.
 */

const OTPModel = (sequelize) => {

  /**
   * Represents an OTP in the system.
   * Inherits from Sequelize's Model class.
   */
  class OTP extends
    Model {}

    /**
     * Initializes the OTP model with predefined fields and options.
     * @returns {Model} OTP model definition.
     * @constructor OTP
     * @param {Object} fields - The fields to define the OTP model.
     */
    OTP.init({
      otpid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      email: { type: DataTypes.STRING(100), allowNull: false, unique: false },
      otp: { type: DataTypes.STRING(6), allowNull: false },
      isUsed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      expiresAt: { type: DataTypes.DATE, allowNull: false }
    }, {
        
        sequelize,
        modelName: 'OTP',
        tableName: 'otp',
        timestamps: true
        });

        // Return the OTP model
        return OTP;
}
/**
 * Exports the Queue model function.
 */
module.exports = OTPModel;

