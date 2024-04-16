// Convert ES6 imports to CommonJS require statements
const db = require('../models/index.js');
const claudniaryUploads = require('../utils/claudniaryUploads.js');

const Image = db.ImageModel;
const Customer = db.CustomerProfileModel;
const Vendor = db.VendorProfileModel;

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

    if (req.files.profilePhoto && req.files.profilePhoto.length) {
      const profilePhoto = req.files.profilePhoto[0];
      const newImage = await claudniaryUploads.uploadSingleFile(profilePhoto);
      console.log(newImage)

      const savedProfilePhoto = await Image.create({
        type: 'profile',
        path: newImage.imageUrl,
        imagealttext: 'Profile Photo',
        userid: user.userid,
      });
      savedImages.push(savedProfilePhoto);
    }

    if (req.files.coverPhoto && req.files.coverPhoto.length) {
      const coverPhoto = req.files.coverPhoto[0];
      const newImage = await claudniaryUploads.uploadSingleFile(coverPhoto);
      const savedCoverPhoto = await Image.create({
        type: 'cover',
        path: newImage.imageUrl,
        imagealttext: 'Cover Photo',
        userid: user.userid,
      });
      savedImages.push(savedCoverPhoto);
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

      if (!req.user){
          return res.status(401).send({ message: 'Unauthorized. Please log in to upload images.' });
      }

      const user = req.user;
      const savedImages = [];

      if (req.files.profilePhoto && req.files.profilePhoto.length) {
        const profilePhoto = req.files.profilePhoto[0];
        const savedProfilePhoto = await Image.update({
          type: 'profile',
          path: profilePhoto.path,
          imagealttext: 'Profile Photo',
          userid: user.userid,
        }, { where: { userid: user.userid } });
        savedImages.push(savedProfilePhoto);
      }

      if (req.files.coverPhoto && req.files.coverPhoto.length) {
        const coverPhoto = req.files.coverPhoto[0];
        const savedCoverPhoto = await Image.update({
          type: 'cover',
          path: coverPhoto.path,
          imagealttext: 'Cover Photo',
          userid: user.userid,
        }, { where: { userid: user.userid } });
        savedImages.push(savedCoverPhoto);
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
}

// Function to delete an image
const deleteImage = async (req, res) => {
    const id = req.params.id;

    Image.destroy({
        where: { imageid: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Image was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Image with id=${id}. Maybe Image was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Image with id=" + id
            });
        });
}

// Export the functions using module.exports
module.exports = {
    uploadImage,
    updateImage,
    deleteImage
};
