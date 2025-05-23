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
exports.PropertyType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var PropertyType;
(function (PropertyType) {
    PropertyType["APARTMENT"] = "apartment";
    PropertyType["HOUSE"] = "house";
    PropertyType["CONDO"] = "condo";
    PropertyType["TOWNHOUSE"] = "townhouse";
    PropertyType["OTHER"] = "other";
})(PropertyType || (exports.PropertyType = PropertyType = {}));
const propertySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
    },
    zipCode: {
        type: String,
        required: [true, 'Zip code is required'],
        trim: true
    },
    propertyType: {
        type: String,
        enum: Object.values(PropertyType),
        required: [true, 'Property type is required']
    },
    bedrooms: {
        type: Number,
        required: [true, 'Number of bedrooms is required'],
        min: [0, 'Bedrooms cannot be negative']
    },
    bathrooms: {
        type: Number,
        required: [true, 'Number of bathrooms is required'],
        min: [0, 'Bathrooms cannot be negative']
    },
    area: {
        type: Number,
        required: [true, 'Area is required'],
        min: [0, 'Area cannot be negative']
    },
    rent: {
        type: Number,
        required: [true, 'Rent is required'],
        min: [0, 'Rent cannot be negative']
    },
    deposit: {
        type: Number,
        required: [true, 'Deposit is required'],
        min: [0, 'Deposit cannot be negative']
    },
    availableFrom: {
        type: Date,
        required: [true, 'Available from date is required']
    },
    furnished: {
        type: Boolean,
        default: false
    },
    petFriendly: {
        type: Boolean,
        default: false
    },
    parking: {
        type: Boolean,
        default: false
    },
    images: {
        type: [String],
        default: []
    },
    amenities: {
        type: [String],
        default: []
    },
    landlord: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Landlord is required']
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
// Create indexes for common search queries
propertySchema.index({ city: 1, state: 1 });
propertySchema.index({ rent: 1 });
propertySchema.index({ bedrooms: 1 });
propertySchema.index({ isAvailable: 1 });
const Property = mongoose_1.default.model('Property', propertySchema);
exports.default = Property;
