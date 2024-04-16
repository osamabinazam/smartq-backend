const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate the token.
 * The token is sent in the header of the request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function to call the next middleware.
 * @returns {Object} res - The response object.
 */
const authenticateToken = (req, res, next) => {
    // Get the content of the authorization header.
    const authHeader = req.headers.authorization;

    // If authorization header is missing, return an error response.
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    // Get the token from the authorization header.
    const token = authHeader.split(' ')[1];

    // If the token is null, return an error response.
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    // Verify the token using jwt.verify
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({ error: "Forbidden" });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken; // Exporting the authenticateToken middleware
