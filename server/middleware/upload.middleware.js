const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
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
      `lease-${req.userId || 'user'}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  }
});

// File filter to allow only images
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  
  cb(new Error('Only image files are allowed!'));
};

// File filter to allow documents
const documentFileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|txt/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  
  if (extname) {
    return cb(null, true);
  }
  
  cb(new Error('Only document files (PDF, DOC, DOCX, TXT) are allowed!'));
};

// Create multer instances
const uploadProfilePicture = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: imageFileFilter
}).single('profilePicture');

const uploadPropertyImages = multer({
  storage: propertyStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: imageFileFilter
}).array('images', 10); // Max 10 images per property

const uploadLeaseDocument = multer({
  storage: leaseStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
  fileFilter: documentFileFilter
}).single('document');

// Middleware to handle file upload errors
const handleUpload = (uploadFunction) => (req, res, next) => {
  uploadFunction(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload error'
      });
    }
    next();
  });
};

module.exports = {
  uploadProfilePicture: handleUpload(uploadProfilePicture),
  uploadPropertyImages: handleUpload(uploadPropertyImages),
  uploadLeaseDocument: handleUpload(uploadLeaseDocument)
};
