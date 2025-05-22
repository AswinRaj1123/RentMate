import express from 'express';
import { 
  createProperty, 
  getAllProperties, 
  getPropertyById, 
  updateProperty, 
  deleteProperty 
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

router.get('/', getAllProperties as RequestHandler);

router.get('/:id', getPropertyById as RequestHandler);

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

export default router;
