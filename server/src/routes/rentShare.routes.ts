import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { 
  createRentShare, 
  getAllRentShares, 
  getRentShareById, 
  updateRentShare, 
  deleteRentShare,
  findMatches
} from '../controllers/rentShare.controller';
import { authMiddleware } from '../middleware/auth.middleware';

// Create a custom type for our route handlers that properly returns void or Promise<void>
type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<void> | void;

const router = express.Router();

// Rent share routes with explicit type casting
router.post('/', authMiddleware as AsyncRouteHandler, createRentShare as AsyncRouteHandler);
router.get('/', getAllRentShares as AsyncRouteHandler);
router.get('/:id', getRentShareById as AsyncRouteHandler);
router.put('/:id', authMiddleware as AsyncRouteHandler, updateRentShare as AsyncRouteHandler);
router.delete('/:id', authMiddleware as AsyncRouteHandler, deleteRentShare as AsyncRouteHandler);
router.get('/:id/matches', authMiddleware as AsyncRouteHandler, findMatches as AsyncRouteHandler);

export default router;
