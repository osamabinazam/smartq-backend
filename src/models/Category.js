const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Category extends Model {}

  Category.init({
    categoryid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    categoryname: { type: DataTypes.STRING(100), allowNull: false },
    parentcategoryid: { type: DataTypes.UUID, references: { model: 'category', key: 'categoryid' } }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    timestamps: false
  });

  return Category;
};
