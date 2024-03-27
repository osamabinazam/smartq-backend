import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imageDirectory = path.join(__dirname, "../public/images");
if (!fs.existsSync(imageDirectory)) {
  fs.mkdirSync(imageDirectory, { recursive: true });
}



/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const uploadImage = async (req, res) => {
  console.log("Upload Image ");
  res.send(200).json({ message: "Image uploaded successfully" });

}

export default uploadImage;