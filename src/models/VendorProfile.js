const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class VendorProfile extends Model {}

  VendorProfile.init({
    vendorprofileid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userid: { type: DataTypes.UUID, allowNull: false, references: { model: 'user', key: 'userid' } },
    businessname: { type: DataTypes.STRING(255) },
    businesstype: { type: DataTypes.STRING(255) },
    bio: { type: DataTypes.TEXT },
    dob: { type: DataTypes.DATEONLY },
    createdate: { type: DataTypes.DATE },
    updatedate: { type: DataTypes.DATE },
    contactid: { type: DataTypes.UUID, references: { model: 'contact', key: 'contactid' } },
    openinghoursid: { type: DataTypes.UUID, references: { model: 'opening_hours', key: 'openinghoursid' } },
    locationid: { type: DataTypes.UUID, references: { model: 'location', key: 'locationid' } },
    certificateid: { type: DataTypes.UUID, references: { model: 'certificate', key: 'certificateid' } },
    educationid: { type: DataTypes.UUID, references: { model: 'education', key: 'educationid' } }
  }, {
    sequelize,
    modelName: 'VendorProfile',
    tableName: 'vendor_profile',
    timestamps: false
  });

  return VendorProfile;
};
