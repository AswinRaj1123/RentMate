import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage for profile pictures
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const profileDir = path.join(uploadsDir, 'profiles');
    if (!fs.existsSync(profileDir)) {
      fs.mkdirSync(profileDir, { recursive: true });
    }
    cb(null, profileDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.userId || 'user'}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// Configure storage for property images
const propertyStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const propertyDir = path.join(uploadsDir, 'properties');
    if (!fs.existsSync(propertyDir)) {
      fs.mkdirSync(propertyDir, { recursive: true });
    }
    cb(null, propertyDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `property-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    );
  }
});

// Configure storage for lease documents
const leaseStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const leaseDir = path.join(uploadsDir, 'leases');
    if (!fs.existsSync(leaseDir)) {
      fs.mkdirSync(leaseDir, { recursive: true });
    }
    cb(null, leaseDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `lease-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    );
  }
});

// File filter to allow only images
const imageFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// File filter to allow documents (PDF, DOC, DOCX)
const documentFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedFileTypes = /pdf|doc|docx/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF and DOC files are allowed!'));
  }
};

// Middleware for uploading profile pictures
export const uploadProfilePicture = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFileFilter
}).single('profilePicture');

// Middleware for uploading property images
export const uploadPropertyImages = multer({
  storage: propertyStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: imageFileFilter
}).array('propertyImages', 10); // Max 10 images

// Middleware for uploading lease documents
export const uploadLeaseDocuments = multer({
  storage: leaseStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: documentFileFilter
}).array('leaseDocuments', 5); // Max 5 documents