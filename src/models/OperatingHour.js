const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OpeningHours extends Model {}

  OpeningHours.init({
    openinghoursid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    weekday: { type: DataTypes.STRING(10) },
    opentime: { type: DataTypes.TIME },
    closetime: { type: DataTypes.TIME },
    isclosed: { type: DataTypes.BOOLEAN }
  }, {
    sequelize,
    modelName: 'OpeningHours',
    tableName: 'opening_hours',
    timestamps: false
  });

  return OpeningHours;
};
