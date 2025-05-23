const { Lease, LeaseStatus } = require('../models/lease.model');
const { Property } = require('../models/property.model');
const { UserRole } = require('../models/user.model');
const { RentShare, PaymentStatus } = require('../models/rentShare.model');

/**
 * Create a new lease
 * @route POST /api/leases
 * @access Private (Landlord only)
 */
const createLease = async (req, res) => {
  try {
    // Check if user is a landlord
    if (req.userRole !== UserRole.LANDLORD && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        message: 'Only landlords can create leases'
      });
    }

    const { property: propertyId, tenant: tenantId } = req.body;

    // Verify property exists and belongs to the landlord
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    if (property.landlord.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only create leases for your own properties'
      });
    }

    // Check if property is available
    if (!property.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Property is not available for lease'
      });
    }

    // Create lease object
    const leaseData = {
      ...req.body,
      landlord: req.userId,
    };

    // Handle document if it was uploaded
    if (req.file) {
      leaseData.documents = [`/uploads/leases/${req.file.filename}`];
    }

    // Create lease
    const lease = await Lease.create(leaseData);

    // Mark property as unavailable
    property.isAvailable = false;
    await property.save();

    res.status(201).json({
      success: true,
      data: lease
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get all leases
 * @route GET /api/leases
 * @access Private (Admin only)
 */
const getLeases = async (req, res) => {
  try {
    // Only admin can view all leases
    if (req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Only admins can view all leases'
      });
    }

    const leases = await Lease.find()
      .populate('property', 'title address city state zipCode rent')
      .populate('tenant', 'name email phone')
      .populate('landlord', 'name email phone');

    res.status(200).json({
      success: true,
      count: leases.length,
      data: leases
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get leases for current user
 * @route GET /api/leases/my-leases
 * @access Private
 */
const getMyLeases = async (req, res) => {
  try {
    let query = {};

    // Filter based on user role
    if (req.userRole === UserRole.TENANT) {
      query = { tenant: req.userId };
    } else if (req.userRole === UserRole.LANDLORD) {
      query = { landlord: req.userId };
    }

    const leases = await Lease.find(query)
      .populate('property', 'title address city state zipCode rent images')
      .populate('tenant', 'name email phone')
      .populate('landlord', 'name email phone');

    res.status(200).json({
      success: true,
      count: leases.length,
      data: leases
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get single lease by ID
 * @route GET /api/leases/:id
 * @access Private
 */
const getLease = async (req, res) => {
  try {
    const lease = await Lease.findById(req.params.id)
      .populate('property', 'title address city state zipCode rent images')
      .populate('tenant', 'name email phone')
      .populate('landlord', 'name email phone');

    if (!lease) {
      return res.status(404).json({
        success: false,
        message: 'Lease not found'
      });
    }

    // Check permission
    if (
      req.userRole !== UserRole.ADMIN &&
      lease.tenant.toString() !== req.userId &&
      lease.landlord.toString() !== req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view this lease'
      });
    }

    res.status(200).json({
      success: true,
      data: lease
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update lease
 * @route PUT /api/leases/:id
 * @access Private (Lease owner or Admin only)
 */
const updateLease = async (req, res) => {
  try {
    let lease = await Lease.findById(req.params.id);

    if (!lease) {
      return res.status(404).json({
        success: false,
        message: 'Lease not found'
      });
    }

    // Check permission
    if (
      req.userRole !== UserRole.ADMIN &&
      lease.landlord.toString() !== req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this lease'
      });
    }

    // Handle document if it was uploaded
    if (req.file) {
      req.body.documents = [...lease.documents, `/uploads/leases/${req.file.filename}`];
    }

    lease = await Lease.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: lease
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete lease
 * @route DELETE /api/leases/:id
 * @access Private (Admin only)
 */
const deleteLease = async (req, res) => {
  try {
    // Only admin can delete leases
    if (req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Only admins can delete leases'
      });
    }

    const lease = await Lease.findById(req.params.id);

    if (!lease) {
      return res.status(404).json({
        success: false,
        message: 'Lease not found'
      });
    }

    // Mark property as available again
    await Property.findByIdAndUpdate(lease.property, { isAvailable: true });

    // Delete all associated rent shares
    await RentShare.deleteMany({ lease: lease._id });

    // Delete the lease
    await lease.deleteOne();

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
 * Terminate lease
 * @route PUT /api/leases/:id/terminate
 * @access Private (Landlord or Admin only)
 */
const terminateLease = async (req, res) => {
  try {
    const lease = await Lease.findById(req.params.id);

    if (!lease) {
      return res.status(404).json({
        success: false,
        message: 'Lease not found'
      });
    }

    // Check permission
    if (
      req.userRole !== UserRole.ADMIN &&
      lease.landlord.toString() !== req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to terminate this lease'
      });
    }

    // Update lease status
    lease.status = LeaseStatus.TERMINATED;
    await lease.save();

    // Mark property as available again
    await Property.findByIdAndUpdate(lease.property, { isAvailable: true });

    res.status(200).json({
      success: true,
      data: lease
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createLease,
  getLeases,
  getMyLeases,
  getLease,
  updateLease,
  deleteLease,
  terminateLease
};
