'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const parentCategories = [
      { categoryid: uuidv4(), categoryname: 'Health', parentcategoryid: null, createdAt: new Date(), updatedAt: new Date() },
      { categoryid: uuidv4(), categoryname: 'Public Service', parentcategoryid: null, createdAt: new Date(), updatedAt: new Date() },
      { categoryid: uuidv4(), categoryname: 'Education', parentcategoryid: null, createdAt: new Date(), updatedAt: new Date() },
      { categoryid: uuidv4(), categoryname: 'Technology', parentcategoryid: null, createdAt: new Date(), updatedAt: new Date() },
      { categoryid: uuidv4(), categoryname: 'Finance', parentcategoryid: null, createdAt: new Date(), updatedAt: new Date() },
    ];

    const childCategories = [
      { categoryname: 'Healthcare Services', parentname: 'Health', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Medical Equipment', parentname: 'Health', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'NADRA', parentname: 'Public Service', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Passport Office', parentname: 'Public Service', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Licensing Office', parentname: 'Public Service', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Schools', parentname: 'Education', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Colleges', parentname: 'Education', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Software', parentname: 'Technology', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Hardware', parentname: 'Technology', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Banking', parentname: 'Finance', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Insurance', parentname: 'Finance', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Account Creation', parentname: 'Banking', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Check Withdrawal', parentname: 'Banking', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Loan Services', parentname: 'Banking', createdAt: new Date(), updatedAt: new Date() },
      { categoryname: 'Customer Support', parentname: 'Banking', createdAt: new Date(), updatedAt: new Date() }
    ];

    const categories = [...parentCategories, ...childCategories.map(category => {
      const parentCategory = parentCategories.find(parent => parent.categoryname === category.parentname)
        || childCategories.find(parent => parent.categoryname === category.parentname);
      return {
        categoryid: uuidv4(),
        categoryname: category.categoryname,
        parentcategoryid: parentCategory ? parentCategory.categoryid : null,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      };
    })];

    await queryInterface.bulkInsert('categories', categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
