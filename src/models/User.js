import { Model, DataTypes } from 'sequelize';

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
    /**
     * Unique identifier for each user.
     * Automatically generated as UUIDv4.
     * @type {DataTypes.UUID}
     */
    userid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    /**
     * Username of the user.
     * Must be unique and not null.
     * @type {DataTypes.STRING}
     */
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    /**
     * Email of the user.
     * Must be unique and not null.
     * @type {DataTypes.STRING}
     */
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    /**
     * Gender of the user.
     * Can be 'male', 'female', or 'other'.
     * @type {DataTypes.ENUM}
     */
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other')
    },
    /**
     * Password of the user.
     * Not null.
     * @type {DataTypes.STRING}
     */
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    /**
     * Date of user registration.
     * Defaults to current date and time.
     * @type {DataTypes.DATE}
     */
    registrationdate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    /**
     * Date of the last login.
     * Initially null.
     * @type {DataTypes.DATE}
     */
    lastlogindate: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    /**
     * Type of user.
     * Can be 'vendor', 'customer', or 'admin'.
     * Defaults to 'customer'.
     * @type {DataTypes.ENUM}
     */
    usertype: {
      type: DataTypes.ENUM('vendor', 'customer', 'admin'),
      defaultValue: 'customer'
    },
    /**
     * Indicates whether the user is active or not.
     * Defaults to true.
     * @type {DataTypes.BOOLEAN}
     */
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    /**
     * Sequelize instance for connecting to the database.
     * @type {*}
     */
    sequelize,
    /**
     * Model name for referencing.
     * @type {string}
     */
    modelName: 'User',
    /**
     * Table name in the database.
     * @type {string}
     */
    tableName: 'users'
  });

  // Return the User model
  return User;
};

/**
 * Exposes the User model definition for further use.
 * @export UserModel
 */
export default UserModel;
