const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CustomerProfile extends Model {}

  CustomerProfile.init({
    customerprofileid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userid: { type: DataTypes.UUID, allowNull: false, references: { model: 'user', key: 'userid' } },
    firstname: { type: DataTypes.STRING(255), allowNull: false },
    lastname: { type: DataTypes.STRING(255), allowNull: false },
    emailaddress: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    dateofbirth: { type: DataTypes.DATEONLY },
    preferences: { type: DataTypes.JSONB },
    contactid: { type: DataTypes.UUID, references: { model: 'contact', key: 'contactid' } },
    createdat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedat: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    sequelize,
    modelName: 'CustomerProfile',
    tableName: 'customer_profile',
    timestamps: false
  });

  return CustomerProfile;
};
