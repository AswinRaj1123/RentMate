import { Request, Response } from 'express';
import RentShare, { PaymentStatus } from '../models/rentShare.model';
import Lease, { LeaseStatus } from '../models/lease.model';
import { UserRole } from '../models/user.model';

/**
 * Create a new rent share
 * @route POST /api/rent-shares
 * @access Private (Landlord only)
 */
export const createRentShare = async (req: Request, res: Response) => {
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

    // Create rent share data
    const rentShareData = {
      ...req.body,
      tenant: tenantId || lease.tenant
    };

    // Create the rent share
    const rentShare = await RentShare.create(rentShareData);

    res.status(201).json({
      success: true,
      data: rentShare
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get all rent shares (admin only)
 * @route GET /api/rent-shares
 * @access Private (Admin only)
 */
export const getRentShares = async (req: Request, res: Response) => {
  try {
    // Check if user is an admin
    if (req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        message: 'Only admins can access all rent shares'
      });
    }

    const rentShares = await RentShare.find()
      .populate({
        path: 'lease',
        select: 'startDate endDate',
        populate: {
          path: 'property',
          select: 'title address'
        }
      })
      .populate('tenant', 'name email')
      .sort({ dueDate: -1 });

    res.status(200).json({
      success: true,
      count: rentShares.length,
      data: rentShares
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get a single rent share
 * @route GET /api/rent-shares/:id
 * @access Private
 */
export const getRentShare = async (req: Request, res: Response) => {
  try {
    const rentShare = await RentShare.findById(req.params.id)
      .populate({
        path: 'lease',
        populate: [
          {
            path: 'property',
            select: 'title address'
          },
          {
            path: 'landlord',
            select: 'name email phone'
          }
        ]
      })
      .populate('tenant', 'name email phone');

    if (!rentShare) {
      return res.status(404).json({
        success: false,
        message: 'Rent share not found'
      });
    }

    // Check if user is authorized to view this rent share
    const lease = await Lease.findById(rentShare.lease);
    if (
      !lease ||
      (rentShare.tenant.toString() !== req.userId &&
        lease.landlord.toString() !== req.userId &&
        req.userRole !== UserRole.ADMIN)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this rent share'
      });
    }

    res.status(200).json({
      success: true,
      data: rentShare
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update a rent share
 * @route PUT /api/rent-shares/:id
 * @access Private (Landlord or Admin only)
 */
export const updateRentShare = async (req: Request, res: Response) => {
  try {
    let rentShare = await RentShare.findById(req.params.id);

    if (!rentShare) {
      return res.status(404).json({
        success: false,
        message: 'Rent share not found'
      });
    }

    // Check if user is the landlord of this rent share's lease or an admin
    const lease = await Lease.findById(rentShare.lease);
    if (
      !lease ||
      (lease.landlord.toString() !== req.userId &&
        req.userRole !== UserRole.ADMIN)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this rent share'
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
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete a rent share
 * @route DELETE /api/rent-shares/:id
 * @access Private (Admin only)
 */
export const deleteRentShare = async (req: Request, res: Response) => {
  try {
    // Only admin can delete rent shares
    if (req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Only admins can delete rent shares'
      });
    }

    const rentShare = await RentShare.findById(req.params.id);

    if (!rentShare) {
      return res.status(404).json({
        success: false,
        message: 'Rent share not found'
      });
    }

    await rentShare.remove();

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
 * Get rent shares by tenant
 * @route GET /api/rent-shares/tenant
 * @access Private (Tenant only)
 */
export const getTenantRentShares = async (req: Request, res: Response) => {
  try {
    // Check if user is a tenant or admin
    if (req.userRole !== UserRole.TENANT && req.userRole !== UserRole.ADMIN) {
      return res.status(403).json({
        message: 'Only tenants can access their rent shares'
      });
    }

    const rentShares = await RentShare.find({
      tenant: req.userId
    })
      .populate({
        path: 'lease',
        select: 'startDate endDate',
        populate: {
          path: 'property',
          select: 'title address images'
        }
      })
      .sort({ dueDate: -1 });

    res.status(200).json({
      success: true,
      count: rentShares.length,
      data: rentShares
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get rent shares by lease
 * @route GET /api/rent-shares/lease/:leaseId
 * @access Private
 */
export const getLeaseRentShares = async (req: Request, res: Response) => {
  try {
    const lease = await Lease.findById(req.params.leaseId);
    if (!lease) {
      return res.status(404).json({
        success: false,
        message: 'Lease not found'
      });
    }

    // Check if user is authorized to view rent shares for this lease
    if (
      lease.tenant.toString() !== req.userId &&
      lease.landlord.toString() !== req.userId &&
      req.userRole !== UserRole.ADMIN
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view rent shares for this lease'
      });
    }

    const rentShares = await RentShare.find({
      lease: req.params.leaseId
    })
      .populate('tenant', 'name email')
      .sort({ dueDate: -1 });

    res.status(200).json({
      success: true,
      count: rentShares.length,
      data: rentShares
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update rent share payment status
 * @route PATCH /api/rent-shares/:id/status
 * @access Private
 */
export const updateRentShareStatus = async (req: Request, res: Response) => {
  try {
    const { status, paymentMethod, transactionId, notes } = req.body;

    if (!Object.values(PaymentStatus).includes(status as PaymentStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status'
      });
    }

    const rentShare = await RentShare.findById(req.params.id);

    if (!rentShare) {
      return res.status(404).json({
        success: false,
        message: 'Rent share not found'
      });
    }

    // Check if user is authorized to update this rent share
    const lease = await Lease.findById(rentShare.lease);
    if (!lease) {
      return res.status(404).json({
        success: false,
        message: 'Associated lease not found'
      });
    }

    // Tenants can only mark as paid, landlords and admins can update any status
    if (req.userRole === UserRole.TENANT) {
      if (rentShare.tenant.toString() !== req.userId) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this rent share'
        });
      }

      if (status !== PaymentStatus.PAID) {
        return res.status(403).json({
          success: false,
          message: 'Tenants can only mark rent shares as paid'
        });
      }
    } else if (
      req.userRole === UserRole.LANDLORD &&
      lease.landlord.toString() !== req.userId
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this rent share'
      });
    }

    // Update rent share
    rentShare.status = status as PaymentStatus;
    
    // If status is PAID, record payment date and details
    if (status === PaymentStatus.PAID) {
      rentShare.paymentDate = new Date();
      if (paymentMethod) rentShare.paymentMethod = paymentMethod;
      if (transactionId) rentShare.transactionId = transactionId;
      if (notes) rentShare.notes = notes;
    }

    await rentShare.save();

    res.status(200).json({
      success: true,
      data: rentShare
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};