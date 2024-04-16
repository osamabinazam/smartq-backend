const { Model, DataTypes } = require('sequelize');

/**
 * Social Media model function
 * @param {*} sequelize  - The Sequelize instance for connecting to the database.
 * @returns {Model} SocialMedia model definition.
 */
const SocialMediaModel = (sequelize) => {

  /**
   * Represents a social media account in the system.
   */
  class SocialMedia extends Model {}

  /**
   * Initializes the SocialMedia model with predefined fields and options.
   * @returns {Model} SocialMedia model definition.
   * @param {Object} fields - The fields to define the SocialMedia model.
   * @constructor SocialMedia
   */
  SocialMedia.init({
    socialmediaid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    link: { type: DataTypes.TEXT },
    platform: { type: DataTypes.STRING(255) }
  }, {
    sequelize,
    modelName: 'SocialMedia',
    tableName: 'social_media_accounts',
    timestamps: true
  });

  return SocialMedia;
};

/**
 * Exports the SocialMedia model function.
 */
module.exports = SocialMediaModel;
