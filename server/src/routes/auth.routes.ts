import express from 'express';
import { register, login, getAuthUser } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { uploadProfilePicture } from '../middleware/upload.middleware';
import { RequestHandler } from '../types/express';

const router = express.Router();

// Auth routes
router.post('/register', register as RequestHandler);
router.post('/login', login as RequestHandler);
router.get('/me', authMiddleware as RequestHandler, getAuthUser as RequestHandler);

export default router;
