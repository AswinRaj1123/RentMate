import * as express from 'express';
import { UserRole } from '../models/user.model';

declare global {
  namespace Express {
    interface Request extends express.Request {
      userId?: string;
      userRole?: UserRole;
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
    }
  }
}

export type RequestHandler = express.RequestHandler;
export type Request = express.Request;
export type Response = express.Response;
export type NextFunction = express.NextFunction;

export default express;
