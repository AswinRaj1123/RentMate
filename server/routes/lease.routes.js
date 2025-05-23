const express = require('express');
const router = express.Router();
const {
  createLease,
  getLeases,
  getMyLeases,
  getLease,
  updateLease,
  deleteLease,
  terminateLease
} = require('../controllers/lease.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const uploadMiddleware = require('../middleware/upload.middleware');
const { UserRole } = require('../models/user.model');

// Lease routes
router.post(
  '/',
  protect,
  authorize(UserRole.LANDLORD, UserRole.ADMIN),
  uploadMiddleware.uploadLeaseDocument,
  createLease
);

router.get('/', protect, authorize(UserRole.ADMIN), getLeases);

router.get('/my-leases', protect, getMyLeases);

router.get('/:id', protect, getLease);

router.put(
  '/:id',
  protect,
  uploadMiddleware.uploadLeaseDocument,
  updateLease
);

router.delete('/:id', protect, authorize(UserRole.ADMIN), deleteLease);

router.put(
  '/:id/terminate',
  protect,
  authorize(UserRole.LANDLORD, UserRole.ADMIN),
  terminateLease
);

module.exports = router;
