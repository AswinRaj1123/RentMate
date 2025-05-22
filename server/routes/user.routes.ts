import express from 'express';
import User, { UserRole } from '../models/user.model';
import { authMiddleware, authorizeRoles } from '../middleware/auth.middleware';
import { uploadProfilePicture } from '../middleware/upload.middleware';
import mongoose from 'mongoose';

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch user profile',
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile', authMiddleware, uploadProfilePicture, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { firstName, lastName, phoneNumber } = req.body;
    
    // Build update object
    const updateData: any = { firstName, lastName, phoneNumber };
    
    // Add profile picture if uploaded
    if (req.file) {
      updateData.profilePicture = `/uploads/profiles/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to update user profile',
      error: error.message
    });
  }
});

// Admin routes to manage users
router.get('/', authMiddleware, authorizeRoles(UserRole.ADMIN), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// Update user status (admin only)
router.put(
  '/:id/status',
  authMiddleware,
  authorizeRoles(UserRole.ADMIN),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive, verificationStatus } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }

      const updateData: any = {};
      if (isActive !== undefined) updateData.isActive = isActive;
      if (verificationStatus !== undefined) updateData.verificationStatus = verificationStatus;

      const user = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        success: true,
        user
      });
    } catch (error: any) {
      res.status(500).json({
        message: 'Failed to update user status',
        error: error.message
      });
    }
  }
);

export default router;
