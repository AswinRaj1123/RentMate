const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

console.log('Starting RentMate server...');

// Import routes
try {
  console.log('Loading routes...');
  const authRoutes = require('./routes/auth.routes');
  const propertyRoutes = require('./routes/property.routes');
  const leaseRoutes = require('./routes/lease.routes');
  const rentShareRoutes = require('./routes/rentShare.routes');
  const userRoutes = require('./routes/user.routes');
  console.log('Routes loaded successfully');

  dotenv.config();
  console.log('Environment variables loaded');

  // Create Express server
  const app = express();
  console.log('Express app created');

  // Express configuration
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  console.log('Express middleware configured');

  // Serve static files
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  console.log('Static file serving configured');

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/properties', propertyRoutes);
  app.use('/api/leases', leaseRoutes);
  app.use('/api/rent-shares', rentShareRoutes);
  app.use('/api/users', userRoutes);
  console.log('Routes mounted');

  // Base route
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to RentMate API' });
  });

  // MongoDB connection
  console.log('Connecting to MongoDB...');
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rentmate')
    .then(() => {
      console.log('Connected to MongoDB');
      
      // Start server after successful MongoDB connection
      const port = process.env.PORT || 5000;
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });

  // Export app for testing
  module.exports = app;
} catch (error) {
  console.error('Error starting server:', error);
}
