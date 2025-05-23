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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRentShareStatus = exports.getLeaseRentShares = exports.getTenantRentShares = exports.deleteRentShare = exports.updateRentShare = exports.getRentShare = exports.getRentShares = exports.createRentShare = void 0;
const rentShare_model_1 = __importStar(require("../models/rentShare.model"));
const lease_model_1 = __importStar(require("../models/lease.model"));
const user_model_1 = require("../models/user.model");
/**
 * Create a new rent share
 * @route POST /api/rent-shares
 * @access Private (Landlord only)
 */
const createRentShare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is a landlord
        if (req.userRole !== user_model_1.UserRole.LANDLORD && req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                message: 'Only landlords can create rent shares'
            });
        }
        const { lease: leaseId, tenant: tenantId } = req.body;
        // Verify lease exists and belongs to the landlord
        const lease = yield lease_model_1.default.findById(leaseId);
        if (!lease) {
            return res.status(404).json({
                success: false,
                message: 'Lease not found'
            });
        }
        if (lease.landlord.toString() !== req.userId && req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'You can only create rent shares for your own leases'
            });
        }
        // Check if lease is active
        if (lease.status !== lease_model_1.LeaseStatus.ACTIVE) {
            return res.status(400).json({
                success: false,
                message: 'Rent shares can only be created for active leases'
            });
        }
        // Create rent share data
        const rentShareData = Object.assign(Object.assign({}, req.body), { tenant: tenantId || lease.tenant });
        // Create the rent share
        const rentShare = yield rentShare_model_1.default.create(rentShareData);
        res.status(201).json({
            success: true,
            data: rentShare
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.createRentShare = createRentShare;
/**
 * Get all rent shares (admin only)
 * @route GET /api/rent-shares
 * @access Private (Admin only)
 */
const getRentShares = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is an admin
        if (req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                message: 'Only admins can access all rent shares'
            });
        }
        const rentShares = yield rentShare_model_1.default.find()
            .populate({
            path: 'lease',
            select: 'startDate endDate',
            populate: {
                path: 'property',
                select: 'title address'
            }
        })
            .populate('tenant', 'name email')
            .sort({ dueDate: -1 });
        res.status(200).json({
            success: true,
            count: rentShares.length,
            data: rentShares
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getRentShares = getRentShares;
/**
 * Get a single rent share
 * @route GET /api/rent-shares/:id
 * @access Private
 */
const getRentShare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rentShare = yield rentShare_model_1.default.findById(req.params.id)
            .populate({
            path: 'lease',
            populate: [
                {
                    path: 'property',
                    select: 'title address'
                },
                {
                    path: 'landlord',
                    select: 'name email phone'
                }
            ]
        })
            .populate('tenant', 'name email phone');
        if (!rentShare) {
            return res.status(404).json({
                success: false,
                message: 'Rent share not found'
            });
        }
        // Check if user is authorized to view this rent share
        const lease = yield lease_model_1.default.findById(rentShare.lease);
        if (!lease ||
            (rentShare.tenant.toString() !== req.userId &&
                lease.landlord.toString() !== req.userId &&
                req.userRole !== user_model_1.UserRole.ADMIN)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this rent share'
            });
        }
        res.status(200).json({
            success: true,
            data: rentShare
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getRentShare = getRentShare;
/**
 * Update a rent share
 * @route PUT /api/rent-shares/:id
 * @access Private (Landlord or Admin only)
 */
const updateRentShare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let rentShare = yield rentShare_model_1.default.findById(req.params.id);
        if (!rentShare) {
            return res.status(404).json({
                success: false,
                message: 'Rent share not found'
            });
        }
        // Check if user is the landlord of this rent share's lease or an admin
        const lease = yield lease_model_1.default.findById(rentShare.lease);
        if (!lease ||
            (lease.landlord.toString() !== req.userId &&
                req.userRole !== user_model_1.UserRole.ADMIN)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this rent share'
            });
        }
        rentShare = yield rentShare_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: rentShare
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.updateRentShare = updateRentShare;
/**
 * Delete a rent share
 * @route DELETE /api/rent-shares/:id
 * @access Private (Admin only)
 */
const deleteRentShare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Only admin can delete rent shares
        if (req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Only admins can delete rent shares'
            });
        }
        const rentShare = yield rentShare_model_1.default.findById(req.params.id);
        if (!rentShare) {
            return res.status(404).json({
                success: false,
                message: 'Rent share not found'
            });
        }
        yield rentShare.remove();
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
exports.deleteRentShare = deleteRentShare;
/**
 * Get rent shares by tenant
 * @route GET /api/rent-shares/tenant
 * @access Private (Tenant only)
 */
const getTenantRentShares = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is a tenant or admin
        if (req.userRole !== user_model_1.UserRole.TENANT && req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                message: 'Only tenants can access their rent shares'
            });
        }
        const rentShares = yield rentShare_model_1.default.find({
            tenant: req.userId
        })
            .populate({
            path: 'lease',
            select: 'startDate endDate',
            populate: {
                path: 'property',
                select: 'title address images'
            }
        })
            .sort({ dueDate: -1 });
        res.status(200).json({
            success: true,
            count: rentShares.length,
            data: rentShares
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getTenantRentShares = getTenantRentShares;
/**
 * Get rent shares by lease
 * @route GET /api/rent-shares/lease/:leaseId
 * @access Private
 */
const getLeaseRentShares = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lease = yield lease_model_1.default.findById(req.params.leaseId);
        if (!lease) {
            return res.status(404).json({
                success: false,
                message: 'Lease not found'
            });
        }
        // Check if user is authorized to view rent shares for this lease
        if (lease.tenant.toString() !== req.userId &&
            lease.landlord.toString() !== req.userId &&
            req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view rent shares for this lease'
            });
        }
        const rentShares = yield rentShare_model_1.default.find({
            lease: req.params.leaseId
        })
            .populate('tenant', 'name email')
            .sort({ dueDate: -1 });
        res.status(200).json({
            success: true,
            count: rentShares.length,
            data: rentShares
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getLeaseRentShares = getLeaseRentShares;
/**
 * Update rent share payment status
 * @route PATCH /api/rent-shares/:id/status
 * @access Private
 */
const updateRentShareStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, paymentMethod, transactionId, notes } = req.body;
        if (!Object.values(rentShare_model_1.PaymentStatus).includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment status'
            });
        }
        const rentShare = yield rentShare_model_1.default.findById(req.params.id);
        if (!rentShare) {
            return res.status(404).json({
                success: false,
                message: 'Rent share not found'
            });
        }
        // Check if user is authorized to update this rent share
        const lease = yield lease_model_1.default.findById(rentShare.lease);
        if (!lease) {
            return res.status(404).json({
                success: false,
                message: 'Associated lease not found'
            });
        }
        // Tenants can only mark as paid, landlords and admins can update any status
        if (req.userRole === user_model_1.UserRole.TENANT) {
            if (rentShare.tenant.toString() !== req.userId) {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized to update this rent share'
                });
            }
            if (status !== rentShare_model_1.PaymentStatus.PAID) {
                return res.status(403).json({
                    success: false,
                    message: 'Tenants can only mark rent shares as paid'
                });
            }
        }
        else if (req.userRole === user_model_1.UserRole.LANDLORD &&
            lease.landlord.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this rent share'
            });
        }
        // Update rent share
        rentShare.status = status;
        // If status is PAID, record payment date and details
        if (status === rentShare_model_1.PaymentStatus.PAID) {
            rentShare.paymentDate = new Date();
            if (paymentMethod)
                rentShare.paymentMethod = paymentMethod;
            if (transactionId)
                rentShare.transactionId = transactionId;
            if (notes)
                rentShare.notes = notes;
        }
        yield rentShare.save();
        res.status(200).json({
            success: true,
            data: rentShare
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.updateRentShareStatus = updateRentShareStatus;
