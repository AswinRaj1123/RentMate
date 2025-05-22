import express from 'express';
import { register, login, getAuthUser } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { uploadProfilePicture } from '../middleware/upload.middleware';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getAuthUser);

export default router;
