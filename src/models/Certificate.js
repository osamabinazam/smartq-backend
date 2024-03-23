const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Certificate extends Model {}

  Certificate.init({
    certificateid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    college: { type: DataTypes.STRING(255), allowNull: false },
    start_date: { type: DataTypes.DATEONLY, allowNull: false },
    end_date: { type: DataTypes.DATEONLY },
    certificate_url: { type: DataTypes.TEXT },
    image_url: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE }
  }, {
    sequelize,
    modelName: 'Certificate',
    tableName: 'certificates',
    timestamps: false
  });

  return Certificate;
};
