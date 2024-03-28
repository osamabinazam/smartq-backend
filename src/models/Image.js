import { Model, DataTypes, Sequelize } from 'sequelize';

/**
 * Represents an image in the system.
 * @class Images
 * @extends Model
 */

const ImageModel = (sequelize) => {
    class Images extends Model { }

    /**
     * Initializes the Images model with predefined fields and options.
     * @returns {Model} Images model definition.
     * @param {Object} fields - The fields to define the Images model.
     * @constructor Images
     */
    Images.init(
        {
            imageid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true }, // The unique identifier for the image
            type: { type: DataTypes.ENUM('profile', 'cover'), allowNull: false },   // Specifies the image type
            path: { type: DataTypes.STRING, allowNull: false },                     // The path to the image file
            imagealttext: { type: DataTypes.STRING, allowNull: true },              // The alt text for the image
        },
        {
            sequelize,
            modelName: "Images",
            tableName: "images",
            timestamps: true,
        }
    );
    return Images;
}

/**
 * Exports the Images model function.
 * @export ImageModel
 */
export default ImageModel;

