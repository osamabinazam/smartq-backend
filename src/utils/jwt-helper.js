import jwt from 'jsonwebtoken'


// This function will generate a new access token and refresh token. It takes in the user object as a parameter. 
const jwtTokens = (user) =>{

    console.log("User is : ", user)

    // Access Token
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2h'});
    // Refresh Token
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
    return {accessToken, refreshToken};

}

export default jwtTokens;
