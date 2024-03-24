import { Model, DataTypes, Sequelize } from 'sequelize';

/**
 *  Contact model function  - Represents the contact information of a user in the system.
 * @param {Sequelize} sequelize  - The Sequelize instance for connecting to the database.
 * @returns  {Model} Contact model definition.
 */
const ContactModel = (sequelize) => {

  /**
   * Represents the contact information of a user in the system.
   * @class Contact
   * @extends Model
   */
  class Contact extends Model {}

  /**
   * Initializes the Contact model with predefined fields and options.
   * @returns {Model} Contact model.
   * @constructor Contact
   * @param {Object} fields - The fields to define the Contact model.
   */
  Contact.init({
    contactid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    phone: { type: DataTypes.STRING(20) },
    contactaddress: { type: DataTypes.TEXT },
    city: { type: DataTypes.STRING(255) },
    state: { type: DataTypes.STRING(255) },
    postalcode: { type: DataTypes.STRING(20) },
    country: { type: DataTypes.STRING(255) }
  }, {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
    timestamps: true
  });

  return Contact;
};


/**
 * Exports the Contact model function.
 * @export ContactModel
 */
export default ContactModel;