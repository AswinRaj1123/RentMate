import express from 'express';
import { RequestHandler } from 'express';
import { UserRole } from '../models/user.model';
import { authMiddleware, authorizeRoles } from '../middleware/auth.middleware';
import { uploadLeaseDocuments } from '../middleware/upload.middleware';
import {
  createLease,
  getLeases,
  getLease,
  updateLease,
  deleteLease,
  getTenantLeases,
  getLandlordLeases,
  updateLeaseStatus
} from '../controllers/lease.controller';

const router = express.Router();

// Create a new lease
router.post(
  '/',
  authMiddleware as RequestHandler,
  authorizeRoles(UserRole.LANDLORD, UserRole.ADMIN) as RequestHandler,
  uploadLeaseDocuments as RequestHandler,
  createLease as RequestHandler
);

// Get all leases (admin only)
router.get(
  '/',
  authMiddleware as RequestHandler,
  authorizeRoles(UserRole.ADMIN) as RequestHandler,
  getLeases as RequestHandler
);

// Get lease by ID
router.get(
  '/:id',
  authMiddleware as RequestHandler,
  getLease as RequestHandler
);

// Update lease status
router.patch(
  '/:id/status',
  authMiddleware as RequestHandler,
  authorizeRoles(UserRole.LANDLORD, UserRole.ADMIN) as RequestHandler,
  updateLeaseStatus as RequestHandler
);

// Update lease
router.put(
  '/:id',
  authMiddleware as RequestHandler,
  authorizeRoles(UserRole.LANDLORD, UserRole.ADMIN) as RequestHandler,
  uploadLeaseDocuments as RequestHandler,
  updateLease as RequestHandler
);

// Delete lease
router.delete(
  '/:id',
  authMiddleware as RequestHandler,
  authorizeRoles(UserRole.ADMIN) as RequestHandler,
  deleteLease as RequestHandler
);

// Get leases by tenant
router.get(
  '/tenant/leases',
  authMiddleware as RequestHandler,
  authorizeRoles(UserRole.TENANT, UserRole.ADMIN) as RequestHandler,
  getTenantLeases as RequestHandler
);

// Get leases by landlord
router.get(
  '/landlord/leases',
  authMiddleware as RequestHandler,
  authorizeRoles(UserRole.LANDLORD, UserRole.ADMIN) as RequestHandler,
  getLandlordLeases as RequestHandler
);

export default router;
