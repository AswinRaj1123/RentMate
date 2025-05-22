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

const router = express.Router();

// Property routes
router.post(
  '/', 
  authMiddleware, 
  authorizeRoles(UserRole.LANDLORD, UserRole.ADMIN), 
  uploadPropertyImages, 
  createProperty
);

router.get('/', getAllProperties);

router.get('/:id', getPropertyById);

router.put(
  '/:id', 
  authMiddleware, 
  uploadPropertyImages, 
  updateProperty
);

router.delete(
  '/:id', 
  authMiddleware, 
  deleteProperty
);

export default router;
