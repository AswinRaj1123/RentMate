"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const property_controller_1 = require("../controllers/property.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_middleware_1 = require("../middleware/upload.middleware");
const user_model_1 = require("../models/user.model");
const router = express_1.default.Router();
// Property routes
router.post('/', auth_middleware_1.authMiddleware, (0, auth_middleware_1.authorizeRoles)(user_model_1.UserRole.LANDLORD, user_model_1.UserRole.ADMIN), upload_middleware_1.uploadPropertyImages, property_controller_1.createProperty);
router.get('/', property_controller_1.getAllProperties);
router.get('/:id', property_controller_1.getPropertyById);
router.put('/:id', auth_middleware_1.authMiddleware, upload_middleware_1.uploadPropertyImages, property_controller_1.updateProperty);
router.delete('/:id', auth_middleware_1.authMiddleware, property_controller_1.deleteProperty);
exports.default = router;
