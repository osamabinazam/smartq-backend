import jwt  from 'jsonwebtoken';

// This middleware will check if the user has a valid access token.

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];  //Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1];
    const refreshToken = req.cookies['refresh_token'];
    if (token == null) return res.status(401).json({error:"Unauthorized"});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) =>{
        if (error) return res.status(403).json({error:"Forbidden"});
        req.user = user;
        next();
    })
}

export default authenticateToken;   // This middleware will be used in the routes that require authentication.