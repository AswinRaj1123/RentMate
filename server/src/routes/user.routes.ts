import express from 'express';
import type { Request, Response, RequestHandler } from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/auth.middleware';
import { uploadProfilePicture } from '../middleware/upload.middleware';
import User, { UserRole } from '../models/user.model';

const router = express.Router();

// Get user by ID
router.get('/:id', (async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}) as RequestHandler);

// Update user profile picture
router.put('/profile', 
  authMiddleware as RequestHandler,
  uploadProfilePicture as RequestHandler,
  (async (req: Request, res: Response) => {
    try {
      const updateData = req.file ? { profilePicture: req.file.filename } : {};
      
      const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  }) as RequestHandler
);

// Get all users (admin only)
router.get('/', 
  authMiddleware as RequestHandler,
  authorizeRoles(UserRole.ADMIN) as RequestHandler,
  (async (req: Request, res: Response) => {
    try {
      const users = await User.find().select('-password');
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  }) as RequestHandler
);

export default router;
