import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import authRoutes from "../routes/AuthRoutes.js";
import userRoutes from "../routes/UserRoutes.js";
import imageUploadsRoutes from "../routes/imageUploadsRoutes.js";
import fs from "fs";
import path from "path";
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imageDirectory = path.join(__dirname, "../../public/images");
if (!fs.existsSync(imageDirectory)) {
  fs.mkdirSync(imageDirectory, { recursive: true });
  console.log("Directory Created Successfully ");
}


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

// Routes
app.use('/',express.static(join(__dirname, "public")));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/images', imageUploadsRoutes);

export default app;





