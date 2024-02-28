import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import userRoutes from "../routes/user.js";
import authRoutes from "../routes/auth.js";
import vendorRoutes from "../routes/vendor.js";
// import authenticateToken from "../middlewares/authorization";


dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
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
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);

export default app;





