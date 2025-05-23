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
exports.getUsersByRole = exports.updatePassword = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const user_model_1 = __importStar(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Get all users (admin only)
 * @route GET /api/users
 * @access Private (Admin only)
 */
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is an admin
        if (req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                message: 'Only admins can access all users'
            });
        }
        const users = yield user_model_1.default.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getUsers = getUsers;
/**
 * Get a single user
 * @route GET /api/users/:id
 * @access Private
 */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        // Users can only view their own profile unless they're an admin
        if (user._id.toString() !== req.userId && req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this user'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getUser = getUser;
/**
 * Update user profile
 * @route PUT /api/users/:id
 * @access Private
 */
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Users can only update their own profile unless they're an admin
        if (req.params.id !== req.userId && req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this user'
            });
        }
        // Don't allow role updates unless admin
        if (req.body.role && req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update role'
            });
        }
        // Don't allow password updates through this endpoint
        if (req.body.password) {
            delete req.body.password;
        }
        const updateData = Object.assign({}, req.body);
        // Handle profile picture if it was uploaded
        if (req.file) {
            updateData.profilePicture = `/uploads/profiles/${req.file.filename}`;
        }
        const user = yield user_model_1.default.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        }).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.updateUser = updateUser;
/**
 * Delete a user
 * @route DELETE /api/users/:id
 * @access Private (Admin only or own account)
 */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Users can only delete their own account unless they're an admin
        if (req.params.id !== req.userId && req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this user'
            });
        }
        const user = yield user_model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        yield user.remove();
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
exports.deleteUser = deleteUser;
/**
 * Update user password
 * @route PUT /api/users/:id/password
 * @access Private
 */
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPassword, newPassword } = req.body;
        // Users can only update their own password
        if (req.params.id !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this user\'s password'
            });
        }
        const user = yield user_model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        // Check if current password is correct
        const isMatch = yield bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }
        // Hash new password
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(newPassword, salt);
        yield user.save();
        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.updatePassword = updatePassword;
/**
 * Get users by role
 * @route GET /api/users/role/:role
 * @access Private (Admin only)
 */
const getUsersByRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is an admin
        if (req.userRole !== user_model_1.UserRole.ADMIN) {
            return res.status(403).json({
                message: 'Only admins can access users by role'
            });
        }
        const { role } = req.params;
        if (!Object.values(user_model_1.UserRole).includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role'
            });
        }
        const users = yield user_model_1.default.find({ role }).select('-password');
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.getUsersByRole = getUsersByRole;
