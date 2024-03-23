const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Education extends Model {}

  Education.init({
    educationid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    school: { type: DataTypes.STRING(255), allowNull: false },
    startat: { type: DataTypes.DATEONLY },
    endat: { type: DataTypes.DATEONLY },
    degree: { type: DataTypes.STRING(255) },
    description: { type: DataTypes.TEXT },
    certificateid: { type: DataTypes.UUID, references: { model: 'certificate', key: 'certificateid' } }
  }, {
    sequelize,
    modelName: 'Education',
    tableName: 'education',
    timestamps: false
  });

  return Education;
};
