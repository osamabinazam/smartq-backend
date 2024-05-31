const bcrypt = require('bcrypt');
const jwtTokens = require('../utils/jwt-helper.js');
const ImageService = require("../services/ImageService.js");
const ProfileService = require("../services/ProfileService.js");
const { sendEmailWithOTP } = require('../utils/emailTransporter.js');
const { generateOTP } = require('../utils/otpGenerate.js');
const OPTService = require('../services/OTPService.js');
const db = require('../models/index.js');

const User = db.UserModel;

/**
 * Login user and return jwt tokens and user data if successful else return error message
 * @param {*} req 
 * @param {*} res 
 * @returns {object} tokens and user data
 */
const login = async (req, res) => {
    if (!req.body) {
        return res.status(400).send("Request body is missing");
    }

    const username_email = req.body.username || req.body.email;

    try {
        const user = await User.findOne({
            where: {
                [db.Sequelize.Op.or]: [{ username: username_email }, { email: username_email }]
            }
        });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send("Invalid password");
        }

        await User.update({ lastlogin: new Date() }, { where: { userid: user.userid } });

        const images = await ImageService.getImagesByUserId(user.userid);

        const userData = { ...user.dataValues, password: undefined, images };

        const tokens = jwtTokens(userData);

        res.status(200).send({ tokens: tokens, user: userData });
    } catch (error) {
        console.error(error);
        return res.status(500).send("An error occurred while processing the login");
    }
};

/**
 * Register a new user and return jwt tokens and user data if successful else return error message
 * @param {*} req 
 * @param {*} res  
 * @returns {object} tokens and user data
 */
const register = async (req, res) => {
    if (!req.body) {
        return res.status(400).send("Request body is missing");
    }

    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            gender: req.body.gender,
            usertype: req.body.userType,
        };

        console.log(user);

        const createdUser = await User.create(user);
        if (!createdUser) {
            return res.status(500).send("Error while registering the user");
        }

        createdUser.password = undefined;

        const tokens = jwtTokens(createdUser.dataValues);

        if (createdUser.dataValues.usertype === 'vendor') {
            const vendorProfile = {
                businessname: null,
                businesstype: null,
                bio: null,
                dob: null,
                userid: createdUser.userid
            };

            try {
                await ProfileService.createVendorProfile(vendorProfile);
            } catch (err) {
                console.error("Failed to create vendor profile.");
            }
        }

        res
            .cookie("access_token", tokens.accessToken, { httpOnly: true })
            .cookie("refresh_token", tokens.refreshToken, { httpOnly: true })
            .cookie("user", createdUser.dataValues)
            .status(201)
            .send({ tokens: tokens, user: createdUser.dataValues, message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while registering the user");
    }
};

/**
 * Get email from user for password reset and send OTP to the email
 * @param {*} req 
 * @param {*} res 
 */
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    console.log("Response Body: ", req.body);

    if (!email) {
        return res.status(400).send("Email address is required.");
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send("User not found.");
        }

        const generatedOTP = generateOTP();

        // send OTP to the user's email
        const info = await sendEmailWithOTP("Support SmartQ", email, "Password Reset OTP", `Your OTP is ${generatedOTP}`, `<p>Your OTP is <b>${generatedOTP}</b></p>`);
        console.log(info);

        // create OTP record in the database
        const optData = {
            email: email,
            otp: generatedOTP,
            isUsed: false,
            expiresAt: new Date(Date.now() + 600000), // 10 minutes from now
        };

        const otpRecord = await OPTService.createOTP(optData);
        console.log("OTP Record:", otpRecord);

        return res.status(200).send("OTP has been sent to your email. Please check your inbox to proceed.");
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).send("An error occurred while processing your request.");
    }
};

/**
 * Verify OTP sent to user's email
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).send("Email and OTP are required.");
    }

    try {
        const otpRecord = await OPTService.getActiveOTPByEmail(email);

        if (!otpRecord) {
            return res.status(404).send("OTP not found or has expired.");
        }

        console.log("OTP is : ", otp);

        if (otpRecord.otp !== otp) {
            return res.status(401).send("Invalid OTP.");
        }

        await OPTService.invalidateOTP(otpRecord.otpid);

        return res.status(200).send("OTP verified successfully.");
    } catch (error) {
        console.error("Error in verifyOTP:", error);
        res.status(500).send("An error occurred while verifying the OTP.");
    }
};

/**
 * Reset user password
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const resetPassword = async (req, res) => {
    if (!req.body) {
        return res.status(400).send("Request body is missing");
    }

    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const email_username = req.body.username ? req.body.username : req.body.email;

        const user = await User.findOne({
            where: {
                [db.Sequelize.Op.or]: [{ username: email_username }, { email: email_username }]
            }
        });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const [updateCount] = await User.update({
            password: hashPassword,
        }, {
            where: {
                userid: user.userid
            }
        });

        if (updateCount === 0) {
            return res.status(500).send("Error while updating the user password");
        }

        user.password = undefined;

        const tokens = jwtTokens(user.dataValues);

        res.status(200).send({
            tokens: tokens,
            user: user.dataValues,
            message: "Password reset successful"
        });
    } catch (err) {
        console.error("Error in resetPassword:", err);
        res.status(500).send("An error occurred while processing your request.");
    }
};

/**
 * Logout user by clearing the cookies
 * @param {*} req 
 * @param {*} res 
 */
const logout = async (req, res) => {
    try {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.clearCookie("user");
        res.status(200).send("User has logged out successfully.");
    } catch (err) {
        console.error("Error in logout:", err);
        res.status(500).send("An error occurred while logging out.");
    }
};

module.exports = {
    login,
    register,
    resetPassword,
    logout,
    forgotPassword,
    verifyOTP
};
