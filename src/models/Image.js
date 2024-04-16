const { Model, DataTypes } = require('sequelize');

/**
 * Represents an image in the system.
 * @class Images
 * @extends Model
 */

const ImageModel = (sequelize) => {
    class Image extends Model { }

    /**
     * Initializes the Images model with predefined fields and options.
     * @returns {Model} Images model definition.
     * @param {Object} fields - The fields to define the Images model.
     * @constructor Images
     */
    Image.init(
        {
            imageid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true }, // The unique identifier for the image
            type: { type: DataTypes.ENUM('profile', 'cover'), allowNull: false },   // Specifies the image type
            path: { type: DataTypes.STRING, allowNull: false },                     // The path to the image file
            imagealttext: { type: DataTypes.STRING, allowNull: true },              // The alt text for the image
        },
        {
            sequelize,
            modelName: "Image",
            tableName: "images",
            timestamps: true,
        }
    );
    return Image;
}

/**
 * Exports the Images model function.
 */
module.exports = ImageModel;
