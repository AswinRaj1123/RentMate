const bcrypt = require('bcrypt');
const { User, UserRole } = require('../models/user.model');

/**
 * Get all users (admin only)
 * @route GET /api/users
 * @access Private (Admin only)
 */
const getUsers = async (req, res) => {
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
  } catch (error) {
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
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Regular users can only access their own profile
    if (req.userRole !== UserRole.ADMIN && req.userId !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this user'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
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
const updateUser = async (req, res) => {
  try {
    // Users can only update their own profile unless they're an admin
    if (req.userRole !== UserRole.ADMIN && req.userId !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this user'
      });
    }

    // Don't allow role updates unless by admin
    if (req.body.role && req.userRole !== UserRole.ADMIN) {
      delete req.body.role;
    }

    // Don't allow password updates with this endpoint
    if (req.body.password) {
      delete req.body.password;
    }

    // Handle profile picture if it was uploaded
    if (req.file) {
      req.body.profilePicture = `/uploads/profiles/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');

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
  } catch (error) {
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
const updatePassword = async (req, res) => {
  try {
    // Users can only update their own password
    if (req.userId !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this password'
      });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete user
 * @route DELETE /api/users/:id
 * @access Private (Admin or user themselves)
 */
const deleteUser = async (req, res) => {
  try {
    // Users can only delete their own account unless they're an admin
    if (req.userRole !== UserRole.ADMIN && req.userId !== req.params.id) {
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

    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  updatePassword,
  deleteUser
};
