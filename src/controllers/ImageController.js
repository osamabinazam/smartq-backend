const db = require('../models/index.js');
const claudniaryUploads = require('../utils/claudniaryUploads.js');

const Image = db.ImageModel;

// Function to handle image uploading
const uploadImage = async (req, res) => {
  try {
    if (!req.files || (!req.files.profilePhoto && !req.files.coverPhoto)) {
      return res.status(400).send({ message: 'No processed files found in the request.' });
    }

    if (!req.user) {
      return res.status(401).send({ message: 'Unauthorized. Please log in to upload images.' });
    }

    const user = req.user;
    const savedImages = [];

    for (const fileType of ['profilePhoto', 'coverPhoto']) {
      if (req.files[fileType] && req.files[fileType].length) {
        const file = req.files[fileType][0];
        const newImage = await claudniaryUploads.uploadSingleFile(file.buffer, fileType);

        const savedImage = await Image.create({
          type: fileType,
          path: newImage.imageUrl,
          publicId: newImage.publicId, // Ensure your model supports storing the publicId
          imagealttext: `${fileType}`,
          userid: user.userid,
        });

        savedImages.push(savedImage);
      }
    }

    res.status(201).json({
      message: "Images uploaded and saved successfully.",
      data: savedImages,
    });
  } catch (error) {
    console.error("Failed to save image data:", error);
    res.status(500).json({
      message: "Failed to upload images due to an internal error.",
      error: error.message,
    });
  }
};

// Function to handle image updating
const updateImage = async (req, res) => {
  try {
    if (!req.files || (!req.files.profilePhoto && !req.files.coverPhoto)) {
      return res.status(400).send({ message: 'No processed files found in the request.' });
    }

    if (!req.user) {
      return res.status(401).send({ message: 'Unauthorized. Please log in to upload images.' });
    }

    const user = req.user;
    const updatedImages = [];

    for (const fileType of ['profilePhoto', 'coverPhoto']) {
      if (req.files[fileType] && req.files[fileType].length) {
        const file = req.files[fileType][0];

        // Fetch the existing image details from the database
        const existingImage = await Image.findOne({
          where: { userid: user.userid, type: fileType }
        });

        // Delete the old image from Cloudinary
        if (existingImage) {
          await claudniaryUploads.destroyImage(existingImage.publicId);
        }

        // Upload the new image to Cloudinary
        const newImage = await claudniaryUploads.uploadSingleFile(file.buffer, fileType);

        // Update the image record in the database
        await existingImage.update({
          path: newImage.imageUrl,
          publicId: newImage.publicId, // Update publicId with the new one
          imagealttext: `${fileType} Updated`
        });

        updatedImages.push(existingImage);
      }
    }

    res.status(200).json({
      message: "Images updated successfully.",
      data: updatedImages,
    });
  } catch (error) {
    console.error("Failed to update image data:", error);
    res.status(500).json({
      message: "Failed to update images due to an internal error.",
      error: error.message,
    });
  }
};

// Function to delete an image
const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findByPk(imageId);

    if (!image) {
      return res.status(404).send({ message: `Image with id=${imageId} not found!` });
    }

    // Delete the image from Cloudinary using its publicId
    await claudniaryUploads.destroyImage(image.publicId);

    // Delete the image record from the database
    await image.destroy();

    res.status(200).send({ message: "Image was deleted successfully!" });
  } catch (error) {
    console.error("Failed to delete image:", error);
    res.status(500).send({
      message: "Could not delete image",
      error: error.message
    });
  }
};

module.exports = {
    uploadImage,
    updateImage,
    deleteImage
};
