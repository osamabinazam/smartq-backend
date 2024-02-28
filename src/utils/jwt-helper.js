import jwt from 'jsonwebtoken'


// This function will generate a new access token and refresh token. It takes in the user object as a parameter. 
const jwtTokens = (user) =>{

    // console.log("Hello from jwtTokens")
    // const user = {
    //     user_id:user.user_id,
    //     firstname:user.firstname,
    //     lastname:user.lastname,
    //     username:user.username,
    //     email:user.email,
    //     phone:user.phone,
    //     gender:user.gender,
    //     password:user.password,
    //     registrationdate:user.registrationdate,
    //     lastlogindate:user.lastlogindate,
    //     usertype:user.usertype,
    //     isactive:user.isactive

    // }

    // Access Token
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2h'});
    // Refresh Token
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
    return {accessToken, refreshToken};

}

export default jwtTokens;
