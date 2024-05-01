const nodemailer = require('nodemailer');
const {generateOTP}  = require('./otpGenerate');
require('dotenv').config();

// Create transporter with nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
        user: process.env.SMTP_AUTH_USER || 'beau.jones69@ethereal.email',
        pass: process.env.SMTP_AUTH_PASSWORD ||'bFJc6WhR8eVdmBgmNg'
    },
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
});

// Function to send OTP email
 function sendEmailWithOTP(email) {
    const otp = generateOTP();
    const mailOptions = {
        from: process.env.FROM_EMAIL || 'osama.bscssef20@iba-suk.edu.pk',
        to: email,
        subject: 'Your One-Time Password (OTP)',
        text: `Your OTP is: ${otp}. It is valid for the next 10 minutes.`,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Failed to send OTP email:', error);
                reject(error);
            } else {
                console.log('OTP email sent:', info.response);
                resolve({otp, info});
            }
        });
    });
}

module.exports = {
    sendEmailWithOTP,
};
