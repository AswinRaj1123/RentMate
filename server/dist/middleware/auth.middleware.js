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
exports.authorizeRoles = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware to authenticate user using JWT token
 * Adds userId and userRole to request object
 */
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get token from header
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        // Add user id to request
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
});
exports.authMiddleware = authMiddleware;
/**
 * Middleware to authorize user roles
 * @param roles - Array of roles allowed to access the route
 */
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.userRole) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        if (!roles.includes(req.userRole)) {
            return res.status(403).json({
                message: `Role ${req.userRole} is not allowed to access this resource`
            });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
