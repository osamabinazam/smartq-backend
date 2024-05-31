const jwt = require('jsonwebtoken');

const jwtTokens = (user) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};


// const invalidateTokenn(token) =>{
    
// }

module.exports = jwtTokens;
