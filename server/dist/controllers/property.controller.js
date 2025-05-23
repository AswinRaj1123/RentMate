"use strict";
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
exports.getMyProperties = exports.getLandlordProperties = exports.deleteProperty = exports.updateProperty = exports.getProperty = exports.getProperties = exports.createProperty = void 0;
const property_model_1 = __importDefault(require("../models/property.model"));
const user_model_1 = require("../models/user.model");
/**
 * Create a new property
 * @route POST /api/properties
 * @access Private (Landlord only)
 */
const createProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is a landlord
        if (req.userRole !== user_model_1.UserRole.LANDLORD && req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                message: 'Only landlords can create properties'
            });
        }
        const propertyData = Object.assign(Object.assign({}, req.body), { landlord: req.userId });
        // Handle images if they were uploaded
        if (req.files && Array.isArray(req.files)) {
            propertyData.images = req.files.map((file) => `/uploads/properties/${file.filename}`);
        }
        const property = yield property_model_1.default.create(propertyData);
        res.status(201).json({
            success: true,
            data: property
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.createProperty = createProperty;
/**
 * Get all properties with filtering
 * @route GET /api/properties
 * @access Public
 */
const getProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city, state, minRent, maxRent, bedrooms, bathrooms, propertyType, furnished, petFriendly, parking, availableFrom, page = 1, limit = 10 } = req.query;
        // Build filter object
        const filter = { isAvailable: true };
        if (city)
            filter.city = new RegExp(city, 'i');
        if (state)
            filter.state = new RegExp(state, 'i');
        if (bedrooms)
            filter.bedrooms = { $gte: Number(bedrooms) };
        if (bathrooms)
            filter.bathrooms = { $gte: Number(bathrooms) };
        if (propertyType)
            filter.propertyType = propertyType;
        if (furnished)
            filter.furnished = furnished === 'true';
        if (petFriendly)
            filter.petFriendly = petFriendly === 'true';
        if (parking)
            filter.parking = parking === 'true';
        if (availableFrom)
            filter.availableFrom = { $lte: new Date(availableFrom) };
        // Handle rent range
        if (minRent || maxRent) {
            filter.rent = {};
            if (minRent)
                filter.rent.$gte = Number(minRent);
            if (maxRent)
                filter.rent.$lte = Number(maxRent);
        }
        // Pagination
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;
        const properties = yield property_model_1.default.find(filter)
            .populate('landlord', 'name email')
            .skip(skip)
            .limit(limitNum)
            .sort({ createdAt: -1 });
        const total = yield property_model_1.default.countDocuments(filter);
        res.status(200).json({
            success: true,
            count: properties.length,
            total,
            pages: Math.ceil(total / limitNum),
            data: properties
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getProperties = getProperties;
/**
 * Get a single property
 * @route GET /api/properties/:id
 * @access Public
 */
const getProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property = yield property_model_1.default.findById(req.params.id).populate('landlord', 'name email phone');
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        res.status(200).json({
            success: true,
            data: property
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getProperty = getProperty;
/**
 * Update a property
 * @route PUT /api/properties/:id
 * @access Private (Landlord only)
 */
const updateProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let property = yield property_model_1.default.findById(req.params.id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        // Check if user is the landlord of this property or an admin
        if (property.landlord.toString() !== req.userId &&
            req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this property'
            });
        }
        const updateData = Object.assign({}, req.body);
        // Handle images if they were uploaded
        if (req.files && Array.isArray(req.files)) {
            const newImages = req.files.map((file) => `/uploads/properties/${file.filename}`);
            // Append new images to existing ones
            updateData.images = [...property.images, ...newImages];
        }
        property = yield property_model_1.default.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: property
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.updateProperty = updateProperty;
/**
 * Delete a property
 * @route DELETE /api/properties/:id
 * @access Private (Landlord only)
 */
const deleteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property = yield property_model_1.default.findById(req.params.id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        // Check if user is the landlord of this property or an admin
        if (property.landlord.toString() !== req.userId &&
            req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this property'
            });
        }
        yield property.remove();
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
exports.deleteProperty = deleteProperty;
/**
 * Get properties by landlord
 * @route GET /api/properties/landlord/:landlordId
 * @access Public
 */
const getLandlordProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield property_model_1.default.find({
            landlord: req.params.landlordId,
            isAvailable: true
        }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getLandlordProperties = getLandlordProperties;
/**
 * Get my properties (for landlords)
 * @route GET /api/properties/my-properties
 * @access Private (Landlord only)
 */
const getMyProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is a landlord
        if (req.userRole !== user_model_1.UserRole.LANDLORD && req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                message: 'Only landlords can access this route'
            });
        }
        const properties = yield property_model_1.default.find({
            landlord: req.userId
        }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getMyProperties = getMyProperties;
