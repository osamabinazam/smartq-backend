const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Location extends Model {}

  Location.init({
    locationid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    address: { type: DataTypes.TEXT },
    city: { type: DataTypes.STRING(255) },
    state: { type: DataTypes.STRING(255) },
    postalcode: { type: DataTypes.STRING(20) },
    longitude: { type: DataTypes.FLOAT },
    latitude: { type: DataTypes.FLOAT }
  }, {
    sequelize,
    modelName: 'Location',
    tableName: 'location',
    timestamps: false
  });

  return Location;
};
