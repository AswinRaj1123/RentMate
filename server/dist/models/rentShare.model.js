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
exports.PaymentStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PAID"] = "paid";
    PaymentStatus["OVERDUE"] = "overdue";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
const rentShareSchema = new mongoose_1.Schema({
    lease: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Lease',
        required: [true, 'Lease is required']
    },
    tenant: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Tenant is required']
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount cannot be negative']
    },
    status: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.PENDING
    },
    paymentDate: {
        type: Date
    },
    paymentMethod: {
        type: String
    },
    transactionId: {
        type: String
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});
// Create indexes for common queries
rentShareSchema.index({ tenant: 1 });
rentShareSchema.index({ lease: 1 });
rentShareSchema.index({ status: 1 });
rentShareSchema.index({ dueDate: 1 });
const RentShare = mongoose_1.default.model('RentShare', rentShareSchema);
exports.default = RentShare;
