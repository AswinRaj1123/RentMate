import express from 'express';
import { 
  createProperty, 
  getProperties, 
  getProperty, 
  updateProperty, 
  deleteProperty,
  getMyProperties,
  getLandlordProperties
} from '../controllers/property.controller';
import { authMiddleware, authorizeRoles } from '../middleware/auth.middleware';
import { uploadPropertyImages } from '../middleware/upload.middleware';
import { UserRole } from '../models/user.model';
import { RequestHandler } from '../types/express';

const router = express.Router();

// Property routes
router.post(
  '/', 
  authMiddleware as RequestHandler, 
  authorizeRoles(UserRole.LANDLORD, UserRole.ADMIN) as RequestHandler, 
  uploadPropertyImages as RequestHandler, 
  createProperty as RequestHandler
);

router.get('/', getProperties as RequestHandler);

router.get('/:id', getProperty as RequestHandler);

router.put(
  '/:id', 
  authMiddleware as RequestHandler, 
  uploadPropertyImages as RequestHandler, 
  updateProperty as RequestHandler
);

router.delete(
  '/:id', 
  authMiddleware as RequestHandler, 
  deleteProperty as RequestHandler
);

// Get properties by landlord
router.get(
  '/landlord/:landlordId',
  getLandlordProperties as RequestHandler
);

// Get my properties (for landlords)
router.get(
  '/my/properties',
  authMiddleware as RequestHandler,
  authorizeRoles(UserRole.LANDLORD, UserRole.ADMIN) as RequestHandler,
  getMyProperties as RequestHandler
);

export default router;
