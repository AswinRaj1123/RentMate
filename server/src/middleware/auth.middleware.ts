import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, UserRole } from '../models/user.model';

interface JwtPayload {
  id: string;
  role: UserRole;
}

/**
 * Middleware to authenticate user using JWT token
 * Adds userId and userRole to request object
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret'
    ) as JwtPayload;

    // Add user id to request
    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

/**
 * Middleware to authorize user roles
 * @param roles - Array of roles allowed to access the route
 */
export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.userRole) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        message: `Role ${req.userRole} is not allowed to access this resource`
      });
    }

    next();
  };
};