"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_middleware_1 = require("../middleware/upload.middleware");
const lease_controller_1 = require("../controllers/lease.controller");
const router = express_1.default.Router();
// Create a new lease
router.post('/', auth_middleware_1.authMiddleware, (0, auth_middleware_1.authorizeRoles)(user_model_1.UserRole.LANDLORD, user_model_1.UserRole.ADMIN), upload_middleware_1.uploadLeaseDocuments, lease_controller_1.createLease);
// Get all leases (admin only)
router.get('/', auth_middleware_1.authMiddleware, (0, auth_middleware_1.authorizeRoles)(user_model_1.UserRole.ADMIN), lease_controller_1.getLeases);
// Get lease by ID
router.get('/:id', auth_middleware_1.authMiddleware, lease_controller_1.getLease);
// Update lease status
router.patch('/:id/status', auth_middleware_1.authMiddleware, (0, auth_middleware_1.authorizeRoles)(user_model_1.UserRole.LANDLORD, user_model_1.UserRole.ADMIN), lease_controller_1.updateLeaseStatus);
// Update lease
router.put('/:id', auth_middleware_1.authMiddleware, (0, auth_middleware_1.authorizeRoles)(user_model_1.UserRole.LANDLORD, user_model_1.UserRole.ADMIN), upload_middleware_1.uploadLeaseDocuments, lease_controller_1.updateLease);
// Delete lease
router.delete('/:id', auth_middleware_1.authMiddleware, (0, auth_middleware_1.authorizeRoles)(user_model_1.UserRole.ADMIN), lease_controller_1.deleteLease);
// Get leases by tenant
router.get('/tenant/leases', auth_middleware_1.authMiddleware, (0, auth_middleware_1.authorizeRoles)(user_model_1.UserRole.TENANT, user_model_1.UserRole.ADMIN), lease_controller_1.getTenantLeases);
// Get leases by landlord
router.get('/landlord/leases', auth_middleware_1.authMiddleware, (0, auth_middleware_1.authorizeRoles)(user_model_1.UserRole.LANDLORD, user_model_1.UserRole.ADMIN), lease_controller_1.getLandlordLeases);
exports.default = router;
