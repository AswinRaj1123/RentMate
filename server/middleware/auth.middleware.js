const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if token is in the authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

      // Set user ID in request
      req.userId = decoded.id;
      req.userRole = decoded.role;

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Middleware to check if user has required role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        message: `User role ${req.userRole} is not authorized to access this resource`
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize
};
