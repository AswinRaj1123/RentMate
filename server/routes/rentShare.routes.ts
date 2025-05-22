import express from 'express';
import { 
  createRentShare, 
  getAllRentShares, 
  getRentShareById, 
  updateRentShare, 
  deleteRentShare,
  findMatches
} from '../controllers/rentShare.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Rent share routes
router.post('/', authMiddleware, createRentShare);
router.get('/', getAllRentShares);
router.get('/:id', getRentShareById);
router.put('/:id', authMiddleware, updateRentShare);
router.delete('/:id', authMiddleware, deleteRentShare);
router.get('/:id/matches', authMiddleware, findMatches);

export default router;
