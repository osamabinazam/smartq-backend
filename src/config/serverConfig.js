const express = require("express");
const { json } = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path"); // Import path module
const authRoutes = require("../routes/AuthRoutes.js");
const userRoutes = require("../routes/UserRoutes.js");
const imageUploadsRoutes = require("../routes/imageUploadsRoutes.js");
const profileRoutes = require("../routes/profileRoutes.js");
const LocationRoutes = require("../routes/LocationRoutes.js");
const fs = require("fs");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Cors Origin Configuration
const coresOption = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

// Express MiddleWares
app.use(cors(coresOption));
app.use(json());
app.use(cookieParser());

// Define image directory using path module
const imageDirectory = path.join(__dirname, "../../public/images");
if (!fs.existsSync(imageDirectory)) {
  fs.mkdirSync(imageDirectory, { recursive: true });
  console.log("Directory Created Successfully ");
}

// Routes
app.use('/', express.static(path.join(__dirname, "public")));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/images', imageUploadsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/location', LocationRoutes);

module.exports = app;
