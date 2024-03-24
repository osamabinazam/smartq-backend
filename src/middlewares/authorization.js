import jwt  from 'jsonwebtoken';


/**
 *  Middleware to authenticate the token. 
 * The token is sent in the header of the request.
 * @param {Object} req - The request object. 
 * @param {Object} res - The response object.
 * @param {Function} next - The next function to call the next middleware. 
 * @returns  {Object} res - The response object.
 */
const authenticateToken = (req, res, next) => {


    //  Get the content of the authorization header.
    const authHeader = req.headers['authorization'];  //Bearer TOKEN

    // Get the token from the authorization header.
    const token = authHeader && authHeader.split(' ')[1];
    
    // Get the refresh token from the cookies.
    const refreshToken = req.cookies['refresh_token'];

    // If the token is null, return an error response.
    if (token == null) return res.status(401).json({error:"Unauthorized"});

    /**
     * Verifies the token and calls the next middleware. 
     * @param {String} token - The token to verify.
     * @param {String} process.env.ACCESS_TOKEN_SECRET - The secret key to verify the token.
     * @param {Function} (error, user) - The callback function to handle the verification.
     * @returns  {Object} res - The response object.
     */
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) =>{
        if (error) return res.status(403).json({error:"Forbidden"});
        req.user = user;
        next();
    })
}

export default authenticateToken;   // This middleware will be used in the routes that require authentication.