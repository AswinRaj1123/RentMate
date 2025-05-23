"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadLeaseDocuments = exports.uploadPropertyImages = exports.uploadProfilePicture = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Create uploads directory if it doesn't exist
const uploadsDir = path_1.default.join(__dirname, '../../uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
// Configure storage for profile pictures
const profileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const profileDir = path_1.default.join(uploadsDir, 'profiles');
        if (!fs_1.default.existsSync(profileDir)) {
            fs_1.default.mkdirSync(profileDir, { recursive: true });
        }
        cb(null, profileDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${req.userId || 'user'}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    }
});
// Configure storage for property images
const propertyStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const propertyDir = path_1.default.join(uploadsDir, 'properties');
        if (!fs_1.default.existsSync(propertyDir)) {
            fs_1.default.mkdirSync(propertyDir, { recursive: true });
        }
        cb(null, propertyDir);
    },
    filename: (req, file, cb) => {
        cb(null, `property-${Date.now()}-${Math.round(Math.random() * 1e9)}${path_1.default.extname(file.originalname)}`);
    }
});
// Configure storage for lease documents
const leaseStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const leaseDir = path_1.default.join(uploadsDir, 'leases');
        if (!fs_1.default.existsSync(leaseDir)) {
            fs_1.default.mkdirSync(leaseDir, { recursive: true });
        }
        cb(null, leaseDir);
    },
    filename: (req, file, cb) => {
        cb(null, `lease-${Date.now()}-${Math.round(Math.random() * 1e9)}${path_1.default.extname(file.originalname)}`);
    }
});
// File filter to allow only images
const imageFileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed!'));
    }
};
// File filter to allow documents (PDF, DOC, DOCX)
const documentFileFilter = (req, file, cb) => {
    const allowedFileTypes = /pdf|doc|docx/;
    const extname = allowedFileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    if (extname) {
        return cb(null, true);
    }
    else {
        cb(new Error('Only PDF and DOC files are allowed!'));
    }
};
// Middleware for uploading profile pictures
exports.uploadProfilePicture = (0, multer_1.default)({
    storage: profileStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: imageFileFilter
}).single('profilePicture');
// Middleware for uploading property images
exports.uploadPropertyImages = (0, multer_1.default)({
    storage: propertyStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: imageFileFilter
}).array('propertyImages', 10); // Max 10 images
// Middleware for uploading lease documents
exports.uploadLeaseDocuments = (0, multer_1.default)({
    storage: leaseStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: documentFileFilter
}).array('leaseDocuments', 5); // Max 5 documents
