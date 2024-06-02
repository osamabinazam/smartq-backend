'use strict';
const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const UserModel = require('../models/User');
const ImageModel = require('../models/Image');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const User = UserModel(db.sequelize);
    const Image = ImageModel(db.sequelize);

    try {
      const users = await User.findAll();
      const images = [];

      const imageSets = [
        {
          profile: 'https://via.placeholder.com/150/92c952',
          cover: 'https://via.placeholder.com/600/771796',
        },
        {
          profile: 'https://via.placeholder.com/150/24f355',
          cover: 'https://via.placeholder.com/600/24f355',
        },
        {
          profile: 'https://via.placeholder.com/150/d32776',
          cover: 'https://via.placeholder.com/600/d32776',
        },
        {
          profile: 'https://via.placeholder.com/150/f66b97',
          cover: 'https://via.placeholder.com/600/f66b97',
        },
        {
          profile: 'https://via.placeholder.com/150/56a8c2',
          cover: 'https://via.placeholder.com/600/56a8c2',
        },
      ];

      users.forEach((user, index) => {
        const imageSet = imageSets[index % imageSets.length];
        const imageData = [
          {
            type: 'profile',
            path: imageSet.profile,
            imagealttext: 'Profile picture',
          },
          {
            type: 'cover',
            path: imageSet.cover,
            imagealttext: 'Cover picture',
          },
        ];

        imageData.forEach((image) => {
          images.push({
            imageid: uuidv4(),
            type: image.type,
            path: image.path,
            imagealttext: image.imagealttext,
            userid: user.userid,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });

      await queryInterface.bulkInsert('images', images, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('images', null, {});
    } catch (error) {
      console.error('Error in seeder: ', error);
    }
  },
};
