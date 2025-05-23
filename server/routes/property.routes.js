const express = require('express');
const router = express.Router();
const { 
  createProperty, 
  getProperties, 
  getProperty, 
  updateProperty, 
  deleteProperty,
  getMyProperties,
  getLandlordProperties
} = require('../controllers/property.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const uploadMiddleware = require('../middleware/upload.middleware');
const { UserRole } = require('../models/user.model');

// Property routes
router.post(
  '/', 
  protect, 
  authorize(UserRole.LANDLORD, UserRole.ADMIN), 
  uploadMiddleware.uploadPropertyImages, 
  createProperty
);

router.get('/', getProperties);

router.get('/my-properties', protect, getMyProperties);

router.get('/landlord/:id', getLandlordProperties);

router.get('/:id', getProperty);

router.put(
  '/:id', 
  protect, 
  uploadMiddleware.uploadPropertyImages, 
  updateProperty
);

router.delete('/:id', protect, deleteProperty);

module.exports = router;
