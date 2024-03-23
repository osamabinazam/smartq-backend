const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}

  User.init({
    userid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    gender: { type: DataTypes.ENUM('male', 'female', 'other') },
    password: { type: DataTypes.STRING(255), allowNull: false },
    registrationdate: { type: DataTypes.DATE },
    lastlogindate: { type: DataTypes.DATE },
    usertype: { type: DataTypes.ENUM('vendor', 'customer', 'admin') },
    isactive: { type: DataTypes.BOOLEAN }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });

  return User;
};
