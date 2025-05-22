"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../../controllers/auth.controller");
var auth_middleware_1 = require("../../middleware/auth.middleware");
var router = express_1.default.Router();
// Route definitions with explicit type casting
router.post('/register', auth_controller_1.register);
router.post('/login', auth_controller_1.login);
router.get('/me', auth_middleware_1.authMiddleware, auth_controller_1.getAuthUser);
exports.default = router;
