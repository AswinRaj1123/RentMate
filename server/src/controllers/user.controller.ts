import { Request, Response } from 'express';
import User, { UserRole } from '../models/user.model';
import bcrypt from 'bcryptjs';

/**
 * Get all users (admin only)
 * @route GET /api/users
 * @access Private (Admin only)
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    // Check if user is an admin
    if (req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        message: 'Only admins can access all users'
      });
    }

    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get a single user
 * @route GET /api/users/:id
 * @access Private
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Users can only view their own profile unless they're an admin
    if (user._id.toString() !== req.userId && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this user'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update user profile
 * @route PUT /api/users/:id
 * @access Private
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Users can only update their own profile unless they're an admin
    if (req.params.id !== req.userId && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this user'
      });
    }

    // Don't allow role updates unless admin
    if (req.body.role && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update role'
      });
    }

    // Don't allow password updates through this endpoint
    if (req.body.password) {
      delete req.body.password;
    }

    const updateData = { ...req.body };

    // Handle profile picture if it was uploaded
    if (req.file) {
      updateData.profilePicture = `/uploads/profiles/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete a user
 * @route DELETE /api/users/:id
 * @access Private (Admin only or own account)
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Users can only delete their own account unless they're an admin
    if (req.params.id !== req.userId && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this user'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update user password
 * @route PUT /api/users/:id/password
 * @access Private
 */
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Users can only update their own password
    if (req.params.id !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this user\'s password'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get users by role
 * @route GET /api/users/role/:role
 * @access Private (Admin only)
 */
export const getUsersByRole = async (req: Request, res: Response) => {
  try {
    // Check if user is an admin
    if (req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        message: 'Only admins can access users by role'
      });
    }

    const { role } = req.params;

    if (!Object.values(UserRole).includes(role as UserRole)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    const users = await User.find({ role }).select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};