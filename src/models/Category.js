const { Model, DataTypes } = require('sequelize');

/**
 * Represents a category in the system.
 * @param {Sequelize} sequelize  - The Sequelize instance for connecting to the database.
 * @returns  {Model} Category model definition.
 */
const CategoryModel = (sequelize) => {

  /**
   * Represents a category in the system.
   * @class Category
   * @extends Model
   */
  class Category extends Model { }

  /**
   * Initializes the Category model with predefined fields and options.
   * @returns {Model} Category model.
   * @constructor Category
   * @param {Object} fields - The fields to define the Category model.
   */
  Category.init({
    categoryid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    categoryname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    parentcategoryid: {
      type: DataTypes.UUID,
      references: { model: 'categories', key: 'categoryid' }
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
  });

  return Category;
};


/**
 * Exports the Category model function.
 */
module.exports = CategoryModel;
