const otpGenerator = require('otp-generator');

// Function to generate an OTP
function generateOTP() {
    return otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    });
}

module.exports = {
    generateOTP
};
