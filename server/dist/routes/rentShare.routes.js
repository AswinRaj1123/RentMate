"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rentShare_controller_1 = require("../controllers/rentShare.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Rent share routes with explicit type casting
router.post('/', auth_middleware_1.authMiddleware, rentShare_controller_1.createRentShare);
router.get('/', rentShare_controller_1.getAllRentShares);
router.get('/:id', rentShare_controller_1.getRentShareById);
router.put('/:id', auth_middleware_1.authMiddleware, rentShare_controller_1.updateRentShare);
router.delete('/:id', auth_middleware_1.authMiddleware, rentShare_controller_1.deleteRentShare);
router.get('/:id/matches', auth_middleware_1.authMiddleware, rentShare_controller_1.findMatches);
exports.default = router;
