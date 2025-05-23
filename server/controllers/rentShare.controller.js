const { RentShare, PaymentStatus } = require('../models/rentShare.model');
const { Lease, LeaseStatus } = require('../models/lease.model');
const { UserRole } = require('../models/user.model');

/**
 * Create a new rent share
 * @route POST /api/rent-shares
 * @access Private (Landlord only)
 */
const createRentShare = async (req, res) => {
  try {
    // Check if user is a landlord
    if (req.userRole !== UserRole.LANDLORD && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        message: 'Only landlords can create rent shares'
      });
    }

    const { lease: leaseId, tenant: tenantId } = req.body;

    // Verify lease exists and belongs to the landlord
    const lease = await Lease.findById(leaseId);
    if (!lease) {
      return res.status(404).json({
        success: false,
        message: 'Lease not found'
      });
    }

    if (lease.landlord.toString() !== req.userId && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'You can only create rent shares for your own leases'
      });
    }

    // Check if lease is active
    if (lease.status !== LeaseStatus.ACTIVE) {
      return res.status(400).json({
        success: false,
        message: 'Rent shares can only be created for active leases'
      });
    }

    // Create rent share
    const rentShare = await RentShare.create({
      ...req.body,
      // Make sure tenant is valid
      tenant: tenantId || lease.tenant
    });

    res.status(201).json({
      success: true,
      data: rentShare
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get all rent shares
 * @route GET /api/rent-shares
 * @access Private (Admin only)
 */
const getRentShares = async (req, res) => {
  try {
    // Only admin can view all rent shares
    if (req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view all rent shares'
      });
    }

    const rentShares = await RentShare.find()
      .populate({
        path: 'lease',
        select: 'startDate endDate monthlyRent',
        populate: {
          path: 'property',
          select: 'title address'
        }
      })
      .populate('tenant', 'name email');

    res.status(200).json({
      success: true,
      count: rentShares.length,
      data: rentShares
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get rent shares for current user
 * @route GET /api/rent-shares/my-rent-shares
 * @access Private
 */
const getMyRentShares = async (req, res) => {
  try {
    let query = {};

    // Filter based on user role
    if (req.userRole === UserRole.TENANT) {
      query = { tenant: req.userId };
    } else if (req.userRole === UserRole.LANDLORD) {
      // For landlords, find all rent shares for leases they own
      const leases = await Lease.find({ landlord: req.userId }).select('_id');
      const leaseIds = leases.map(lease => lease._id);
      query = { lease: { $in: leaseIds } };
    }

    const rentShares = await RentShare.find(query)
      .populate({
        path: 'lease',
        select: 'startDate endDate monthlyRent',
        populate: {
          path: 'property',
          select: 'title address'
        }
      })
      .populate('tenant', 'name email');

    res.status(200).json({
      success: true,
      count: rentShares.length,
      data: rentShares
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get single rent share by ID
 * @route GET /api/rent-shares/:id
 * @access Private
 */
const getRentShare = async (req, res) => {
  try {
    const rentShare = await RentShare.findById(req.params.id)
      .populate({
        path: 'lease',
        select: 'startDate endDate monthlyRent landlord',
        populate: {
          path: 'property',
          select: 'title address'
        }
      })
      .populate('tenant', 'name email');

    if (!rentShare) {
      return res.status(404).json({
        success: false,
        message: 'Rent share not found'
      });
    }

    // Check permission
    if (req.userRole === UserRole.TENANT && rentShare.tenant._id.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view this rent share'
      });
    } else if (req.userRole === UserRole.LANDLORD && rentShare.lease.landlord.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view this rent share'
      });
    }

    res.status(200).json({
      success: true,
      data: rentShare
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update rent share
 * @route PUT /api/rent-shares/:id
 * @access Private (Landlord or Admin only)
 */
const updateRentShare = async (req, res) => {
  try {
    // Only landlords and admins can update rent shares
    if (req.userRole !== UserRole.LANDLORD && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Only landlords and admins can update rent shares'
      });
    }

    let rentShare = await RentShare.findById(req.params.id).populate('lease', 'landlord');

    if (!rentShare) {
      return res.status(404).json({
        success: false,
        message: 'Rent share not found'
      });
    }

    // Check ownership for landlords
    if (req.userRole === UserRole.LANDLORD && rentShare.lease.landlord.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update rent shares for your own leases'
      });
    }

    rentShare = await RentShare.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: rentShare
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete rent share
 * @route DELETE /api/rent-shares/:id
 * @access Private (Landlord or Admin only)
 */
const deleteRentShare = async (req, res) => {
  try {
    // Only landlords and admins can delete rent shares
    if (req.userRole !== UserRole.LANDLORD && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Only landlords and admins can delete rent shares'
      });
    }

    const rentShare = await RentShare.findById(req.params.id).populate('lease', 'landlord');

    if (!rentShare) {
      return res.status(404).json({
        success: false,
        message: 'Rent share not found'
      });
    }

    // Check ownership for landlords
    if (req.userRole === UserRole.LANDLORD && rentShare.lease.landlord.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete rent shares for your own leases'
      });
    }

    await rentShare.deleteOne();

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

/**
 * Mark rent share as paid
 * @route PUT /api/rent-shares/:id/pay
 * @access Private (Tenant, Landlord or Admin)
 */
const payRentShare = async (req, res) => {
  try {
    const rentShare = await RentShare.findById(req.params.id)
      .populate('lease', 'landlord tenant')
      .populate('tenant');

    if (!rentShare) {
      return res.status(404).json({
        success: false,
        message: 'Rent share not found'
      });
    }

    // Check authorization
    if (
      req.userRole === UserRole.TENANT && 
      rentShare.tenant._id.toString() !== req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to pay this rent share'
      });
    } else if (
      req.userRole === UserRole.LANDLORD && 
      rentShare.lease.landlord.toString() !== req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to manage this rent share'
      });
    }

    // Update status and payment details
    rentShare.status = PaymentStatus.PAID;
    rentShare.paymentDate = new Date();
    rentShare.paymentMethod = req.body.paymentMethod || 'Online';
    rentShare.transactionId = req.body.transactionId;
    rentShare.notes = req.body.notes;

    await rentShare.save();

    res.status(200).json({
      success: true,
      data: rentShare
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createRentShare,
  getRentShares,
  getMyRentShares,
  getRentShare,
  updateRentShare,
  deleteRentShare,
  payRentShare
};
