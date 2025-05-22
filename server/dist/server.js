"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// Import routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const lease_routes_1 = __importDefault(require("./routes/lease.routes"));
const rentShare_routes_1 = __importDefault(require("./routes/rentShare.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
dotenv_1.default.config();
// Create Express server
const app = (0, express_1.default)();
// Express configuration
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/properties', property_routes_1.default);
app.use('/api/leases', lease_routes_1.default);
app.use('/api/rent-shares', rentShare_routes_1.default);
app.use('/api/users', user_routes_1.default);
// MongoDB connection
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rentmate')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
