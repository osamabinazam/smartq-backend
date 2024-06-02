const { Model, DataTypes, Sequelize } = require('sequelize');

/**
 *  Certificate model function - Represents the certificate of a user in the system.
 * @param {Sequelize} sequelize - The Sequelize instance for connecting to the database.
 * @returns {Model} Certificate model definition.
 */
const CertificateModel = (sequelize) => {

  /**
   * Represents the certificate of a user in the system.
   * @class Certificate
   * @extends Model
   */
  class Certificate extends Model {}

  /**
   * Initializes the Certificate model with predefined fields and options.
   * @returns {Model} Certificate model.
   * @constructor Certificate
   * @param {Object} fields - The fields to define the Certificate model.
   */
  Certificate.init({
    certificateid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    college: { type: DataTypes.STRING(255), allowNull: false },
    start_date: { type: DataTypes.DATEONLY, allowNull: false },
    end_date: { type: DataTypes.DATEONLY },
    certificate_url: { type: DataTypes.TEXT },
    image_url: { type: DataTypes.TEXT },
  }, {
    sequelize,
    modelName: 'Certificate',
    tableName: 'certificates',
    timestamps: true
  });

  return Certificate;
};

/**
 * Exports the Certificate model function.
 */
module.exports = CertificateModel;
