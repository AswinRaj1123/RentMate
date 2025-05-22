# RentMate - Property Rental Management System

## Overview

RentMate is an all-inclusive Property Rental Management System that aims to make the process of renting properties easy for both landlords and tenants. The site offers a user-friendly interface for posting properties, searching rentals, handling leases, and assisting in finding individuals interested in sharing rooms/properties, all under one roof.

## Key Features

### For Landlords:
- Register and create a landlord profile
- List properties with details (location, rent, amenities, photos)
- Manage tenant applications and lease agreements

### For Tenants:
- Search and filter properties based on preferences
- Find a partner to share the rent of properties
- Apply for properties and manage leases

### For Admins:
- Monitor platform activity
- Verify landlords and properties
- Manage user accounts

## Tech Stack

### Frontend:
- React.js with TypeScript
- Material UI for modern, responsive design
- Framer Motion for animations
- React Router for navigation
- React Query for data fetching

### Backend:
- Node.js / Express.js
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- MongoDB for database
- Multer for file uploads
- Nodemailer for email notifications

## Installation & Setup

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or Atlas connection)

### Backend Setup
1. Navigate to the server directory
   ```
   cd server
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a .env file with the following variables
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rentmate
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   EMAIL_SERVICE=gmail
   ```

4. Start the server
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory
   ```
   cd client
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

## Project Structure

```
RentMate/
│
├── client/                  # Frontend React application
│   ├── public/              # Static files
│   └── src/                 # Source files
│       ├── assets/          # Images, styles
│       ├── components/      # Reusable components
│       ├── context/         # Context providers
│       ├── hooks/           # Custom hooks
│       ├── pages/           # Page components
│       └── services/        # API services
│
└── server/                  # Backend Node.js application
    ├── config/              # Configuration files
    ├── controllers/         # Route controllers
    ├── middleware/          # Middleware functions
    ├── models/              # Database models
    ├── routes/              # API routes
    └── utils/               # Utility functions
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.