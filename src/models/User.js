const { Model, DataTypes } = require('sequelize');

/**
 * Defines the User model using Sequelize.
 * @param {*} sequelize - The Sequelize instance for connecting to the database.
 * @returns {Model} User model definition.
 */
const UserModel = (sequelize) => {

  /**
   * Represents a user in the system.
   * Inherits from Sequelize's Model class.
   */
  class User extends Model {}

  /**
   * Initializes the User model with predefined fields and options.
   * @returns {Model} User model definition.
   * @constructor User
   * @param {Object} fields - The fields to define the User model.
   */
  User.init({
    
    userid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    gender: { type: DataTypes.ENUM('male', 'female', 'other') },
    password: { type: DataTypes.STRING(255), allowNull: false },
    lastlogin: { type: DataTypes.DATE, defaultValue: null },
    usertype: { type: DataTypes.ENUM('vendor', 'customer', 'admin'), defaultValue: 'customer' },
    isactive: { type: DataTypes.BOOLEAN, defaultValue: true },
    isVarified: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  // Return the User model
  return User;
};

/**
 * Exposes the User model definition for further use.
 */
module.exports = UserModel;
