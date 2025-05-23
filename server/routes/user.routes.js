const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  updatePassword,
  deleteUser
} = require('../controllers/user.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const uploadMiddleware = require('../middleware/upload.middleware');
const { UserRole } = require('../models/user.model');

// User routes
router.get('/', protect, authorize(UserRole.ADMIN), getUsers);

router.get('/:id', protect, getUser);

router.put(
  '/:id',
  protect,
  uploadMiddleware.uploadProfilePicture,
  updateUser
);

router.put('/:id/password', protect, updatePassword);

router.delete('/:id', protect, deleteUser);

module.exports = router;
