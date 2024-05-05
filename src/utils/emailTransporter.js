const nodemailer = require('nodemailer');
const { google } = require('googleapis');

require('dotenv').config();

const CLIENT_ID = "971387716508-fsni3ojk0a854rbegupbbieeaidpbr9q.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04y84gb0zmrtVCgYIARAAGAQSNwF-L9IrGGOeR2zY4QZDN1EfWgUtnoxWglUR77UrpWykHDJGvn5KqtKgf_gejwx3mFUl3P9eLqM";

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmailWithOTP(name, to, subject, text, html) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();  // Ensure this call is awaited

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: "smartqofficial.help@gmail.com",
                clientId: CLIENT_ID,          // Correct case
                clientSecret: CLIENT_SECRET,  // Correct case
                refreshToken: REFRESH_TOKEN,  // Correct case
                accessToken: accessToken.token  // Pass accessToken dynamically
            }
        });

        const mailOptions = {
            from: `${name} <smartqofficial.help@gmail.com>`,
            to: to,
            subject: subject,
            text: text,
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        throw error;  // Rethrow the error to handle it outside this function if necessary
    }
}

module.exports = {
    sendEmailWithOTP,
};
