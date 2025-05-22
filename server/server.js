"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
// Import routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const lease_routes_1 = __importDefault(require("./routes/lease.routes"));
const rentShare_routes_1 = __importDefault(require("./routes/rentShare.routes"));
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
// Static folder for uploads
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
// API routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/properties', property_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/leases', lease_routes_1.default);
app.use('/api/rent-share', rentShare_routes_1.default);
// Base route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to RentMate API' });
});
// Connect to MongoDB and start server
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
exports.default = app;
