import { Request, Response } from 'express';
import Lease, { LeaseStatus } from '../models/lease.model';
import Property from '../models/property.model';
import { UserRole } from '../models/user.model';
import RentShare, { PaymentStatus } from '../models/rentShare.model';

/**
 * Create a new lease
 * @route POST /api/leases
 * @access Private (Landlord only)
 */
export const createLease = async (req: Request, res: Response) => {
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

    // Create lease data
    const leaseData = {
      ...req.body,
      landlord: req.userId
    };

    // Handle documents if they were uploaded
    if (req.files && Array.isArray(req.files)) {
      leaseData.documents = req.files.map(
        (file: Express.Multer.File) => `/uploads/leases/${file.filename}`
      );
    }

    // Create the lease
    const lease = await Lease.create(leaseData);

    // Update property availability
    property.isAvailable = false;
    await property.save();

    res.status(201).json({
      success: true,
      data: lease
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get all leases (admin only)
 * @route GET /api/leases
 * @access Private (Admin only)
 */
export const getLeases = async (req: Request, res: Response) => {
  try {
    // Check if user is an admin
    if (req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        message: 'Only admins can access all leases'
      });
    }

    const leases = await Lease.find()
      .populate('property', 'title address')
      .populate('tenant', 'name email')
      .populate('landlord', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leases.length,
      data: leases
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get a single lease
 * @route GET /api/leases/:id
 * @access Private
 */
export const getLease = async (req: Request, res: Response) => {
  try {
    const lease = await Lease.findById(req.params.id)
      .populate('property')
      .populate('tenant', 'name email phone')
      .populate('landlord', 'name email phone');

    if (!lease) {
      return res.status(404).json({
        success: false,
        message: 'Lease not found'
      });
    }

    // Check if user is authorized to view this lease
    if (
      lease.tenant.toString() !== req.userId &&
      lease.landlord.toString() !== req.userId &&
      req.userRole !== UserRole.ADMIN
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this lease'
      });
    }

    res.status(200).json({
      success: true,
      data: lease
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update a lease
 * @route PUT /api/leases/:id
 * @access Private (Landlord only)
 */
export const updateLease = async (req: Request, res: Response) => {
  try {
    let lease = await Lease.findById(req.params.id);

    if (!lease) {
      return res.status(404).json({
        success: false,
        message: 'Lease not found'
      });
    }

    // Check if user is the landlord of this lease or an admin
    if (
      lease.landlord.toString() !== req.userId &&
      req.userRole !== UserRole.ADMIN
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this lease'
      });
    }

    const updateData = { ...req.body };

    // Handle documents if they were uploaded
    if (req.files && Array.isArray(req.files)) {
      const newDocuments = req.files.map(
        (file: Express.Multer.File) => `/uploads/leases/${file.filename}`
      );
      
      // Append new documents to existing ones
      updateData.documents = [...lease.documents, ...newDocuments];
    }

    lease = await Lease.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: lease
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete a lease
 * @route DELETE /api/leases/:id
 * @access Private (Admin only)
 */
export const deleteLease = async (req: Request, res: Response) => {
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

    // Make property available again
    await Property.findByIdAndUpdate(lease.property, {
      isAvailable: true
    });

    // Delete all rent shares associated with this lease
    await RentShare.deleteMany({ lease: lease._id });

    // Delete the lease
    await lease.remove();

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
 * Get leases by tenant
 * @route GET /api/leases/tenant
 * @access Private (Tenant only)
 */
export const getTenantLeases = async (req: Request, res: Response) => {
  try {
    // Check if user is a tenant or admin
    if (req.userRole !== UserRole.TENANT && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        message: 'Only tenants can access their leases'
      });
    }

    const leases = await Lease.find({
      tenant: req.userId
    })
      .populate('property', 'title address images')
      .populate('landlord', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leases.length,
      data: leases
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get leases by landlord
 * @route GET /api/leases/landlord
 * @access Private (Landlord only)
 */
export const getLandlordLeases = async (req: Request, res: Response) => {
  try {
    // Check if user is a landlord or admin
    if (req.userRole !== UserRole.LANDLORD && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        message: 'Only landlords can access their leases'
      });
    }

    const leases = await Lease.find({
      landlord: req.userId
    })
      .populate('property', 'title address images')
      .populate('tenant', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leases.length,
      data: leases
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update lease status
 * @route PATCH /api/leases/:id/status
 * @access Private (Landlord or Admin only)
 */
export const updateLeaseStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!Object.values(LeaseStatus).includes(status as LeaseStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lease status'
      });
    }

    const lease = await Lease.findById(req.params.id);

    if (!lease) {
      return res.status(404).json({
        success: false,
        message: 'Lease not found'
      });
    }

    // Check if user is the landlord of this lease or an admin
    if (
      lease.landlord.toString() !== req.userId &&
      req.userRole !== UserRole.ADMIN
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this lease status'
      });
    }

    lease.status = status as LeaseStatus;
    await lease.save();

    // If lease is terminated or expired, make property available again
    if (
      status === LeaseStatus.TERMINATED ||
      status === LeaseStatus.EXPIRED
    ) {
      await Property.findByIdAndUpdate(lease.property, {
        isAvailable: true
      });
    }

    res.status(200).json({
      success: true,
      data: lease
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};