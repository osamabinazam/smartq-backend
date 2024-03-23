const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class SocialMedia extends Model {}

  SocialMedia.init({
    socialmediaid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    vendorid: { type: DataTypes.UUID, allowNull: false, references: { model: 'user', key: 'userid' } },
    link: { type: DataTypes.TEXT },
    platform: { type: DataTypes.STRING(255) }
  }, {
    sequelize,
    modelName: 'SocialMedia',
    tableName: 'social_media',
    timestamps: false
  });

  return SocialMedia;
};
