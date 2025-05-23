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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaseStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var LeaseStatus;
(function (LeaseStatus) {
    LeaseStatus["PENDING"] = "pending";
    LeaseStatus["ACTIVE"] = "active";
    LeaseStatus["EXPIRED"] = "expired";
    LeaseStatus["TERMINATED"] = "terminated";
    LeaseStatus["REJECTED"] = "rejected";
})(LeaseStatus || (exports.LeaseStatus = LeaseStatus = {}));
const leaseSchema = new mongoose_1.Schema({
    property: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Property',
        required: [true, 'Property is required']
    },
    tenant: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Tenant is required']
    },
    landlord: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Landlord is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    monthlyRent: {
        type: Number,
        required: [true, 'Monthly rent is required'],
        min: [0, 'Monthly rent cannot be negative']
    },
    securityDeposit: {
        type: Number,
        required: [true, 'Security deposit is required'],
        min: [0, 'Security deposit cannot be negative']
    },
    status: {
        type: String,
        enum: Object.values(LeaseStatus),
        default: LeaseStatus.PENDING
    },
    documents: {
        type: [String],
        default: []
    },
    terms: {
        type: String,
        required: [true, 'Lease terms are required']
    }
}, {
    timestamps: true
});
// Create indexes for common queries
leaseSchema.index({ tenant: 1 });
leaseSchema.index({ landlord: 1 });
leaseSchema.index({ property: 1 });
leaseSchema.index({ status: 1 });
const Lease = mongoose_1.default.model('Lease', leaseSchema);
exports.default = Lease;
