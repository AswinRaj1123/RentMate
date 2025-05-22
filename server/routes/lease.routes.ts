import express from 'express';
import mongoose from 'mongoose';
import Lease, { LeaseStatus } from '../models/lease.model';
import Property from '../models/property.model';
import User, { UserRole } from '../models/user.model';
import { authMiddleware, authorizeRoles } from '../middleware/auth.middleware';
import { uploadLeaseDocuments } from '../middleware/upload.middleware';
import nodemailer from 'nodemailer';

const router = express.Router();

// Create a new lease
router.post(
  '/',
  authMiddleware,
  uploadLeaseDocuments,
  async (req, res) => {
    try {
      const {
        property,
        landlord,
        tenant,
        startDate,
        endDate,
        monthlyRent,
        securityDeposit,
        terms
      } = req.body;

      // Validate property
      if (!mongoose.Types.ObjectId.isValid(property)) {
        return res.status(400).json({ message: 'Invalid property ID' });
      }

      const propertyDoc = await Property.findById(property);
      if (!propertyDoc) {
        return res.status(404).json({ message: 'Property not found' });
      }

      // Validate landlord
      if (!mongoose.Types.ObjectId.isValid(landlord)) {
        return res.status(400).json({ message: 'Invalid landlord ID' });
      }

      const landlordUser = await User.findById(landlord);
      if (!landlordUser || landlordUser.role !== UserRole.LANDLORD) {
        return res.status(404).json({ message: 'Landlord not found or invalid' });
      }

      // Validate tenant
      if (!mongoose.Types.ObjectId.isValid(tenant)) {
        return res.status(400).json({ message: 'Invalid tenant ID' });
      }

      const tenantUser = await User.findById(tenant);
      if (!tenantUser || tenantUser.role !== UserRole.TENANT) {
        return res.status(404).json({ message: 'Tenant not found or invalid' });
      }

      // Check if user is the landlord or an admin
      if (
        req.userId !== landlord &&
        req.userRole !== UserRole.ADMIN
      ) {
        return res.status(403).json({ message: 'You do not have permission to create this lease' });
      }

      // Process uploaded documents if any
      const documents: string[] = [];
      if (req.files && Array.isArray(req.files)) {
        (req.files as Express.Multer.File[]).forEach(file => {
          documents.push(`/uploads/leases/${file.filename}`);
        });
      }

      // Create the lease
      const lease = await Lease.create({
        property,
        landlord,
        tenant,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        monthlyRent,
        securityDeposit,
        documents,
        terms
      });

      // Send email notification to tenant
      if (process.env.NODE_ENV !== 'test') {
        try {
          const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });

          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: tenantUser.email,
            subject: 'New Lease Agreement',
            html: `
              <h1>New Lease Agreement</h1>
              <p>Dear ${tenantUser.firstName},</p>
              <p>A new lease agreement has been created for you. Please log in to your account to view and respond to it.</p>
              <p>Property: ${propertyDoc.title}</p>
              <p>Start Date: ${new Date(startDate).toLocaleDateString()}</p>
              <p>End Date: ${new Date(endDate).toLocaleDateString()}</p>
              <p>Monthly Rent: $${monthlyRent}</p>
              <p>Thank you for using RentMate!</p>
            `
          });
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
          // Continue with the response even if email fails
        }
      }

      res.status(201).json({
        success: true,
        lease
      });
    } catch (error: any) {
      res.status(500).json({
        message: 'Failed to create lease',
        error: error.message
      });
    }
  }
);

// Get all leases (filtered by user role and ID)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, property } = req.query;
    
    // Build filter object based on user role
    const filter: any = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (property && mongoose.Types.ObjectId.isValid(property as string)) {
      filter.property = property;
    }
    
    // Apply role-based filters
    if (req.userRole === UserRole.TENANT) {
      filter.tenant = req.userId;
    } else if (req.userRole === UserRole.LANDLORD) {
      filter.landlord = req.userId;
    }
    // Admins can see all leases
    
    const leases = await Lease.find(filter)
      .populate('property', 'title address images')
      .populate('landlord', 'firstName lastName email')
      .populate('tenant', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leases.length,
      leases
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch leases',
      error: error.message
    });
  }
});

// Get lease by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid lease ID format' });
    }

    const lease = await Lease.findById(id)
      .populate('property', 'title address images')
      .populate('landlord', 'firstName lastName email phoneNumber')
      .populate('tenant', 'firstName lastName email phoneNumber');

    if (!lease) {
      return res.status(404).json({ message: 'Lease not found' });
    }

    // Check if user has permission to view this lease
    if (
      req.userId !== lease.landlord._id.toString() &&
      req.userId !== lease.tenant._id.toString() &&
      req.userRole !== UserRole.ADMIN
    ) {
      return res.status(403).json({ message: 'You do not have permission to view this lease' });
    }

    res.status(200).json({
      success: true,
      lease
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch lease',
      error: error.message
    });
  }
});

// Update lease status
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid lease ID format' });
    }

    if (!Object.values(LeaseStatus).includes(status as LeaseStatus)) {
      return res.status(400).json({ message: 'Invalid lease status' });
    }

    const lease = await Lease.findById(id);
    if (!lease) {
      return res.status(404).json({ message: 'Lease not found' });
    }

    // Check permissions based on requested status change
    if (status === LeaseStatus.ACTIVE || status === LeaseStatus.REJECTED) {
      // Only tenant can accept or reject
      if (req.userId !== lease.tenant.toString() && req.userRole !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Only the tenant can accept or reject a lease' });
      }
    } else if (status === LeaseStatus.TERMINATED) {
      // Only landlord or admin can terminate
      if (req.userId !== lease.landlord.toString() && req.userRole !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Only the landlord can terminate a lease' });
      }
    }

    // Update the lease status
    const updatedLease = await Lease.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate('property', 'title address images')
      .populate('landlord', 'firstName lastName email')
      .populate('tenant', 'firstName lastName email');

    res.status(200).json({
      success: true,
      lease: updatedLease
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to update lease status',
      error: error.message
    });
  }
});

export default router;
