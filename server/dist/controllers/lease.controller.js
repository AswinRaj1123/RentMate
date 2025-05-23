"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeaseStatus = exports.getLandlordLeases = exports.getTenantLeases = exports.deleteLease = exports.updateLease = exports.getLease = exports.getLeases = exports.createLease = void 0;
const lease_model_1 = __importStar(require("../models/lease.model"));
const property_model_1 = __importDefault(require("../models/property.model"));
const user_model_1 = require("../models/user.model");
const rentShare_model_1 = __importDefault(require("../models/rentShare.model"));
/**
 * Create a new lease
 * @route POST /api/leases
 * @access Private (Landlord only)
 */
const createLease = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is a landlord
        if (req.userRole !== user_model_1.UserRole.LANDLORD && req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                message: 'Only landlords can create leases'
            });
        }
        const { property: propertyId, tenant: tenantId } = req.body;
        // Verify property exists and belongs to the landlord
        const property = yield property_model_1.default.findById(propertyId);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        if (property.landlord.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'You can only create leases for your own properties'
            });
        }
        // Check if property is available
        if (!property.isAvailable) {
            return res.status(400).json({
                success: false,
                message: 'Property is not available for lease'
            });
        }
        // Create lease data
        const leaseData = Object.assign(Object.assign({}, req.body), { landlord: req.userId });
        // Handle documents if they were uploaded
        if (req.files && Array.isArray(req.files)) {
            leaseData.documents = req.files.map((file) => `/uploads/leases/${file.filename}`);
        }
        // Create the lease
        const lease = yield lease_model_1.default.create(leaseData);
        // Update property availability
        property.isAvailable = false;
        yield property.save();
        res.status(201).json({
            success: true,
            data: lease
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.createLease = createLease;
/**
 * Get all leases (admin only)
 * @route GET /api/leases
 * @access Private (Admin only)
 */
const getLeases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is an admin
        if (req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                message: 'Only admins can access all leases'
            });
        }
        const leases = yield lease_model_1.default.find()
            .populate('property', 'title address')
            .populate('tenant', 'name email')
            .populate('landlord', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: leases.length,
            data: leases
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getLeases = getLeases;
/**
 * Get a single lease
 * @route GET /api/leases/:id
 * @access Private
 */
const getLease = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lease = yield lease_model_1.default.findById(req.params.id)
            .populate('property')
            .populate('tenant', 'name email phone')
            .populate('landlord', 'name email phone');
        if (!lease) {
            return res.status(404).json({
                success: false,
                message: 'Lease not found'
            });
        }
        // Check if user is authorized to view this lease
        if (lease.tenant.toString() !== req.userId &&
            lease.landlord.toString() !== req.userId &&
            req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this lease'
            });
        }
        res.status(200).json({
            success: true,
            data: lease
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getLease = getLease;
/**
 * Update a lease
 * @route PUT /api/leases/:id
 * @access Private (Landlord only)
 */
const updateLease = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let lease = yield lease_model_1.default.findById(req.params.id);
        if (!lease) {
            return res.status(404).json({
                success: false,
                message: 'Lease not found'
            });
        }
        // Check if user is the landlord of this lease or an admin
        if (lease.landlord.toString() !== req.userId &&
            req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this lease'
            });
        }
        const updateData = Object.assign({}, req.body);
        // Handle documents if they were uploaded
        if (req.files && Array.isArray(req.files)) {
            const newDocuments = req.files.map((file) => `/uploads/leases/${file.filename}`);
            // Append new documents to existing ones
            updateData.documents = [...lease.documents, ...newDocuments];
        }
        lease = yield lease_model_1.default.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: lease
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.updateLease = updateLease;
/**
 * Delete a lease
 * @route DELETE /api/leases/:id
 * @access Private (Admin only)
 */
const deleteLease = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Only admin can delete leases
        if (req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Only admins can delete leases'
            });
        }
        const lease = yield lease_model_1.default.findById(req.params.id);
        if (!lease) {
            return res.status(404).json({
                success: false,
                message: 'Lease not found'
            });
        }
        // Make property available again
        yield property_model_1.default.findByIdAndUpdate(lease.property, {
            isAvailable: true
        });
        // Delete all rent shares associated with this lease
        yield rentShare_model_1.default.deleteMany({ lease: lease._id });
        // Delete the lease
        yield lease.remove();
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.deleteLease = deleteLease;
/**
 * Get leases by tenant
 * @route GET /api/leases/tenant
 * @access Private (Tenant only)
 */
const getTenantLeases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is a tenant or admin
        if (req.userRole !== user_model_1.UserRole.TENANT && req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                message: 'Only tenants can access their leases'
            });
        }
        const leases = yield lease_model_1.default.find({
            tenant: req.userId
        })
            .populate('property', 'title address images')
            .populate('landlord', 'name email phone')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: leases.length,
            data: leases
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getTenantLeases = getTenantLeases;
/**
 * Get leases by landlord
 * @route GET /api/leases/landlord
 * @access Private (Landlord only)
 */
const getLandlordLeases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is a landlord or admin
        if (req.userRole !== user_model_1.UserRole.LANDLORD && req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                message: 'Only landlords can access their leases'
            });
        }
        const leases = yield lease_model_1.default.find({
            landlord: req.userId
        })
            .populate('property', 'title address images')
            .populate('tenant', 'name email phone')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: leases.length,
            data: leases
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getLandlordLeases = getLandlordLeases;
/**
 * Update lease status
 * @route PATCH /api/leases/:id/status
 * @access Private (Landlord or Admin only)
 */
const updateLeaseStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        if (!Object.values(lease_model_1.LeaseStatus).includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid lease status'
            });
        }
        const lease = yield lease_model_1.default.findById(req.params.id);
        if (!lease) {
            return res.status(404).json({
                success: false,
                message: 'Lease not found'
            });
        }
        // Check if user is the landlord of this lease or an admin
        if (lease.landlord.toString() !== req.userId &&
            req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this lease status'
            });
        }
        lease.status = status;
        yield lease.save();
        // If lease is terminated or expired, make property available again
        if (status === lease_model_1.LeaseStatus.TERMINATED ||
            status === lease_model_1.LeaseStatus.EXPIRED) {
            yield property_model_1.default.findByIdAndUpdate(lease.property, {
                isAvailable: true
            });
        }
        res.status(200).json({
            success: true,
            data: lease
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.updateLeaseStatus = updateLeaseStatus;
