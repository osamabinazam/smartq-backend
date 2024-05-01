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
      
      email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      otp: { type: DataTypes.STRING(6), allowNull: false },
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

