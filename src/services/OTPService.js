const db = require('../models/index.js');

const OTPModel = db.OTPModel;

/**
 * Create a new OTP
 * @param {Object} otp - OTP object
 * @returns {Object} - The created OTP object
 * @throws {Error} - Throws error if the operation fails
 */
const createOTP = async (otp) => {
    try {
        return await OTPModel.create(otp);
    } catch (error) {
        console.error("Error creating OTP:", error);
        throw new Error("Failed to create OTP.");
    }
}

/**
 * Get OTP by ID
 * @param {number} otpId - OTP ID
 * @returns {Object} - The OTP object
 * @throws {Error} - Throws error if the operation fails
 */
const getOTPById = async (otpId) => {
    try {
        return await OTPModel.findByPk(otpId);
    } catch (error) {
        console.error("Error fetching OTP:", error);
        throw new Error("Failed to fetch OTP.");
    }
}

/**
 * Get OTP by email and expire time
 * @param {string} email - Email
 * @param {number} expireTime - Expire time in minutes
 * @returns {Object} - The OTP object
 * @throws {Error} - Throws error if the operation fails
 */
const getOTPByEmailAndExpireTime = async (email, expireTime) => {
    try {
        return await OTPModel.findOne({
            where: {
                email: email,
                createdAt: {
                    [db.Sequelize.Op.gt]: new Date(new Date() - expireTime * 60000)
                }
            }
        });
    } catch (error) {
        console.error("Error fetching OTP:", error);
        throw new Error("Failed to fetch OTP.");
    }
}





