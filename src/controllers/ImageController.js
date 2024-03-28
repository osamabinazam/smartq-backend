// Assuming this is in src/controllers/ImageController.js
import db  from '../models/index.js'; // Adjust the import path according to your project structure


const Image = db.ImageModel;
const Customer = db.CustomerProfileModel;
const Vendor = db.VendorProfileModel;




/**
 * Controller to handle the logic after images are uploaded and processed.
 * Saves image data in the database and responds to the client.
 * 
 * @param {Object} req - The request object from Express, containing uploaded files.
 * @param {Object} res - The response object from Express.
 */
const uploadImage = async (req, res) => {
  try {
    // Check if there are files processed and available in the request
    if (!req.files || (!req.files.profilePhoto && !req.files.coverPhoto)) {
      return res.status(400).send({ message: 'No processed files found in the request.' });
    }


    // Check if the user is authenticated
    if (!req.user){
        return res.status(401).send({ message: 'Unauthorized. Please log in to upload images.' });
    }

    // Get User's Profile
    const user = req.user;
    // const profile = user.role === 'customer' ? await Customer.findOne({ where: { userid: user.userid } }) : await Vendor.findOne({ where: { userid: user.userid } });
    

    const savedImages = []; // To store the results of saved images

    // Process and save profile photo if it exists
    if (req.files.profilePhoto && req.files.profilePhoto.length) {
      const profilePhoto = req.files.profilePhoto[0];
      const savedProfilePhoto = await Image.create({
        type: 'profile',
        path: profilePhoto.path,
        imagealttext: 'Profile Photo',
        userid: user.userid,

      });
      savedImages.push(savedProfilePhoto);
    }

    // Process and save cover photo if it exists
    if (req.files.coverPhoto && req.files.coverPhoto.length) {
      const coverPhoto = req.files.coverPhoto[0];
      const savedCoverPhoto = await Image.create({
        type: 'cover',
        path: coverPhoto.path,
        imagealttext: 'Cover Photo', // Or derive from file data if applicable
        userid: user.userid,
      });
      savedImages.push(savedCoverPhoto);
    }

    // Respond to the client with saved image details
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

/**
 * Controller to handle the logic when an upadated image is uploaded and processed.
 *  Updates image data in the database and responds to the client.
 */

const updateImage = async (req, res) => {
    try {
      // Check if there are files processed and available in the request
      if (!req.files || (!req.files.profilePhoto && !req.files.coverPhoto)) {
        return res.status(400).send({ message: 'No processed files found in the request.' });
      }
  
  
      // Check if the user is authenticated
      if (!req.user){
          return res.status(401).send({ message: 'Unauthorized. Please log in to upload images.' });
      }
  
      // Get User's Profile
      const user = req.user;
      // const profile = user.role === 'customer' ? await Customer.findOne({ where: { userid: user.userid } }) : await Vendor.findOne({ where: { userid: user.userid } });
      
  
      const savedImages = []; // To store the results of saved images
  
      // Process and save profile photo if it exists
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
  
      // Process and save cover photo if it exists
      if (req.files.coverPhoto && req.files.coverPhoto.length) {
        const coverPhoto = req.files.coverPhoto[0];
        const savedCoverPhoto = await Image.update({
          type: 'cover',
          path: coverPhoto.path,
          imagealttext: 'Cover Photo', // Or derive from file data if applicable
          userid: user.userid,
        }, { where: { userid: user.userid } });
        savedImages.push(savedCoverPhoto);
      }
  
      // Respond to the client with saved image details
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


/**
 * Remove the image from the database and the file system
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * 
 */
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



/**
 * Export the controller function for use in the routes.
 * This can be imported and used in the routes file.
 */
export default uploadImage;
