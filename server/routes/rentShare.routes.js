const express = require('express');
const router = express.Router();
const {
  createRentShare,
  getRentShares,
  getMyRentShares,
  getRentShare,
  updateRentShare,
  deleteRentShare,
  payRentShare
} = require('../controllers/rentShare.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { UserRole } = require('../models/user.model');

// Rent share routes
router.post(
  '/',
  protect,
  authorize(UserRole.LANDLORD, UserRole.ADMIN),
  createRentShare
);

router.get('/', protect, authorize(UserRole.ADMIN), getRentShares);

router.get('/my-rent-shares', protect, getMyRentShares);

router.get('/:id', protect, getRentShare);

router.put(
  '/:id',
  protect,
  authorize(UserRole.LANDLORD, UserRole.ADMIN),
  updateRentShare
);

router.delete(
  '/:id',
  protect,
  authorize(UserRole.LANDLORD, UserRole.ADMIN),
  deleteRentShare
);

router.put('/:id/pay', protect, payRentShare);

module.exports = router;
