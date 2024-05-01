const { Model, DataTypes } = require('sequelize');

/**
 * Education model function - Represents the education of a user in the system.
 * @param {*} sequelize - The Sequelize instance for connecting to the database.
 * @returns {Model} Education model definition.
 */
const EducationModel = (sequelize) => {

  /**
   * Represents the education of a user in the system.
   * @class Education 
   * @extends Model  
   */
  class Education extends Model {}

  /**
   * Initializes the Education model with predefined fields and options.
   * @returns {Model} Education model.
   * @constructor Education 
   * @param {Object} fields - The fields to define the Education model.
   */
  Education.init({
    educationid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    school: { type: DataTypes.STRING(255), allowNull: false },
    degree: { type: DataTypes.STRING(255) },
    startAt: { type: DataTypes.DATEONLY },
    endAt: { type: DataTypes.DATEONLY },
    description: { type: DataTypes.TEXT },
  }, {
    sequelize,
    modelName: 'Education',
    tableName: 'educations',
    timestamps: true
  });

  return Education;
};

/**
 * Exports the Education model function.
 */
module.exports = EducationModel;
