const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth.routes');
const propertyRoutes = require('./routes/property.routes');
const leaseRoutes = require('./routes/lease.routes');
const rentShareRoutes = require('./routes/rentShare.routes');
const userRoutes = require('./routes/user.routes');

dotenv.config();

// Create Express server
const app = express();

// Express configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/leases', leaseRoutes);
app.use('/api/rent-shares', rentShareRoutes);
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rentmate')
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
