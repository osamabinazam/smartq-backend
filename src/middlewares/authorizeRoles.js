import jwt from 'jsonwebtoken';

/**
 * Middleware to authorize users based on roles.
 * @param {...string} allowedRoles - Roles that are allowed to access the route.
 * @returns Middleware function that checks user's role against allowed roles.
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send('Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (!allowedRoles.includes(decoded.usertype)) {
        return res.status(403).send('Access denied. You do not have permission to perform this action.');
      }

      // If user's role is allowed, attach user info to the request and proceed
      req.user = decoded;
      next();
    } catch (error) {
      console.log("Error : ", error);
      return res.status(400).send('Invalid token.');
    }
  };
};

export default authorizeRoles;
