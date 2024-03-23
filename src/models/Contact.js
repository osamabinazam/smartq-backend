const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Contact extends Model {}

  Contact.init({
    contactid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userid: { type: DataTypes.UUID, allowNull: false, references: { model: 'user', key: 'userid' } },
    phone: { type: DataTypes.STRING(20) },
    contactaddress: { type: DataTypes.TEXT },
    city: { type: DataTypes.STRING(255) },
    state: { type: DataTypes.STRING(255) },
    postalcode: { type: DataTypes.STRING(20) },
    country: { type: DataTypes.STRING(255) }
  }, {
    sequelize,
    modelName: 'Contact',
    tableName: 'contact',
    timestamps: false
  });

  return Contact;
};
