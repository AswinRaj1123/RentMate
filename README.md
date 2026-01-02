# RentMate – Property Rental Management System

> **Award-Winning Property Rental Platform**  
> Clean UI Award Winner at MERNathon Hackathon (Naan Mudhalvan, Government of Tamil Nadu)

---

## Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Objectives](#-objectives)
- [Features](#-features)
- [Architecture & Design](#-architecture--design)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Advantages](#-advantages)
- [Challenges Addressed](#-challenges-addressed)
- [Future Enhancements](#-future-enhancements)
- [Team](#-team)
- [Contributing](#-contributing)
- [License](#-license)

---

## Overview

**RentMate** is a comprehensive Property Rental Management System that simplifies the rental process for both landlords and tenants. Our platform provides a unified solution for property listings, tenant applications, lease management, and finding compatible roommates to share rent.

By combining an intuitive user interface with robust backend infrastructure, RentMate eliminates the fragmentation in the rental market and creates a seamless experience for all users.

### Key Highlights
- Full-stack MERN application
- Role-based authentication (Landlord, Tenant, Admin)
- Real-time property search and filtering
- Intelligent roommate matching algorithm
- Secure JWT-based authentication
- Responsive design across all devices

---

## Problem Statement

### Current Market Challenges

**For Tenants:**
- Difficulty finding appropriate rental properties
- Lack of platforms to discover compatible co-partners for rent-sharing
- Fragmented processes for lease negotiation
- No unified solution for rental management

**Market Gap:**
- Existing solutions are either fragmented or not user-friendly
- Missing features for finding reliable roommates
- Inefficient rental processes that lack integration

---

## Objectives

1. **Develop a Unified System** – Create an all-in-one platform for property listings and rental management
2. **Empower Tenants** – Enable easy property search and application submission
3. **Smart Matching** – Assist tenants in locating reliable partners with compatible preferences
4. **Ensure Security** – Provide robust data protection and user confidentiality
5. **Simplify Landlord Operations** – Streamline property management and tenant applications for landlords

---

## Features

### For Landlords

- **Profile Management**
  - Register and create a comprehensive landlord profile
  - Manage profile information and verification status

- **Property Management**
  - List properties with detailed information (location, rent, amenities, photos)
  - Edit and delete property listings
  - View property-specific metrics and statistics

- **Application Management**
  - Review tenant applications
  - Accept or reject applications
  - Track application status in real-time
  - View applicant details and messages

- **Lease Management**
  - Create and manage lease agreements
  - Track rent collection status

### For Tenants

- **Property Discovery**
  - Search and filter properties by location, price range, and amenities
  - View detailed property information with photos
  - Advanced filtering options (rent, location, number of tenants)

- **Application Submission**
  - Submit applications for desired properties
  - Track application status
  - Communicate with landlords through messages

- **Roommate Matching**
  - Find compatible partners to share rent
  - AI-powered compatibility scoring based on preferences
  - Connect with other tenants looking for roommates

- **User Profile**
  - Create detailed profile with preferences
  - View saved properties
  - Track application history

### For Admins

- **Platform Monitoring**
  - Monitor overall platform activity
  - Manage user accounts and verify identities
  - Track system health and performance
  - Generate platform reports and analytics

---

## Architecture & Design

RentMate follows a modern **MERN Stack Architecture**:

```
┌─────────────────────────────────────────────────────┐
│              FRONTEND (React + Vite)                │
│  • Role-based responsive UI                         │
│  • Landlord & Tenant dashboards                     │
│  • Real-time property browsing                      │
└────────────────────┬────────────────────────────────┘
                     │ HTTP/REST
┌────────────────────▼────────────────────────────────┐
│         BACKEND (Node.js + Express.js)              │
│  • RESTful API endpoints                            │
│  • Business logic & authentication                  │
│  • JWT-based secure sessions                        │
│  • Roommate matching algorithm                      │
└────────────────────┬────────────────────────────────┘
                     │ MongoDB Queries
┌────────────────────▼────────────────────────────────┐
│          DATABASE (MongoDB)                         │
│  • User information & profiles                      │
│  • Property listings & details                      │
│  • Lease agreements & applications                  │
│  • Roommate requests & matches                      │
└─────────────────────────────────────────────────────┘
```

### Design Philosophy
- **User-Centric** – Every feature designed with user needs in mind
- **Modular** – Clean separation of concerns across components
- **Scalable** – Database indexing and pagination for growth
- **Secure** – JWT authentication and password hashing with bcrypt

---

## Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library for building interactive components |
| **Vite** | Fast build tool and dev server |
| **React Router** | Client-side routing |
| **CSS3** | Styling and responsive design |
| **Axios** | HTTP client for API calls |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework for REST APIs |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT (jsonwebtoken)** | Secure authentication tokens |
| **Bcrypt** | Password hashing & security |
| **Nodemailer** | Email service for OTP & notifications |
| **Morgan** | HTTP request logging |
| **CORS** | Cross-origin resource sharing |

### Development Tools
| Tool | Purpose |
|------|---------|
| **Git/GitHub** | Version control |
| **ESLint** | Code quality & linting |
| **Render** | Cloud deployment |
| **MongoDB Atlas** | Cloud database hosting |

---

## Project Structure

```
RentMate/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── login_page/
│   │   │   ├── Signup_page/
│   │   │   ├── main_page/
│   │   │   ├── Profile_page/
│   │   │   ├── Landlord_profile/
│   │   │   ├── Forgot_password/
│   │   │   └── Otp_page/
│   │   ├── Landlord/
│   │   │   ├── Add_Property_page.jsx
│   │   │   ├── My_property.jsx
│   │   │   └── View_application.jsx
│   │   ├── User/
│   │   │   ├── Main_search_page.jsx
│   │   │   ├── Search_page.jsx
│   │   │   ├── Property_page.jsx
│   │   │   └── members.jsx
│   │   ├── Admin/
│   │   │   └── admin_page.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── config.js
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── node_server.js
│   ├── package.json
│   └── .env (environment variables)
│
├── README.md
├── LICENSE
└── requirements.txt
```

---

## Installation & Setup

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher) or MongoDB Atlas account
- **npm** or **yarn**
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/AswinRaj1123/RentMate.git
cd RentMate
```

### Step 2: Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_specific_password
PORT=3000
```

Start the backend server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will be available at `http://localhost:3000`

### Step 3: Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Step 4: Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Health Check:** http://localhost:3000/health

---

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/users` | Register a new user | No |
| POST | `/api/login` | User login | No |
| POST | `/api/request-otp` | Request OTP for signup | No |
| POST | `/api/verify-otp` | Verify OTP | No |
| POST | `/api/resend-otp` | Resend OTP | No |

### Password Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/forgot-password` | Initiate password reset | No |
| POST | `/api/verify-reset-otp` | Verify reset OTP | No |
| POST | `/api/reset-password` | Reset password with OTP | No |
| POST | `/api/resend-reset-otp` | Resend reset OTP | No |

### Property Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/properties` | Get all properties (paginated) | No |
| GET | `/api/property/:userId` | Get properties by landlord | No |
| POST | `/api/property` | Create new property | Yes |
| GET | `/api/property/details/:propertyId` | Get property details | No |
| PUT | `/api/property/:propertyId` | Update property | Yes |
| DELETE | `/api/property/:propertyId` | Delete property | Yes |
| GET | `/api/search-properties` | Search properties with filters | No |

### Application Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/property/:propertyId/applications` | Get applications for property | Yes |
| POST | `/api/property/:propertyId/apply` | Submit application | Yes |
| PATCH | `/api/applications/:applicationId/status` | Update application status | Yes |
| GET | `/api/applications/:applicationId` | Get application details | Yes |

### Landlord Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/landlord/:landlordId/properties` | Get all landlord properties | Yes |
| GET | `/api/landlord/:landlordId/applications` | Get all applications for landlord | Yes |

### Roommate Matching

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/ai/users` | Register user preferences | No |
| GET | `/api/recommend/:userId` | Get roommate recommendations | Yes |

### System Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | API information | No |
| GET | `/health` | Server health check | No |

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  gender: String (enum: ["Male", "Female", "Other"]),
  occupation: String,
  role: String (enum: ["Tenant", "Landlord", "Admin"]),
  createdAt: Date,
  updatedAt: Date
}
```

### Properties Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  numberOfTenants: Number,
  location: String,
  rent: Number,
  description: String,
  amenities: [String],
  photos: [String] (URLs),
  roomSharing: [{
    ambience: String,
    sharingOption: String,
    createdAt: Date
  }],
  status: String (enum: ["available", "rented"]),
  createdAt: Date,
  updatedAt: Date
}
```

### Applications Collection
```javascript
{
  _id: ObjectId,
  propertyId: ObjectId (ref: Property),
  applicantId: ObjectId (ref: User),
  message: String,
  status: String (enum: ["Pending", "Accepted", "Rejected"]),
  appliedAt: Date,
  updatedAt: Date
}
```

### OTP Collection
```javascript
{
  _id: ObjectId,
  email: String,
  otp: String,
  createdAt: Date (expires in 5 minutes)
}
```

### User Preferences Collection (for Roommate Matching)
```javascript
{
  _id: ObjectId,
  name: String,
  budget: Number,
  location: String,
  sleep_schedule: String,
  cleanliness: Number (1-10),
  food: String (enum: ["veg", "non-veg"]),
  social_level: Number (1-10)
}
```

---

## Configuration

### Environment Variables

**Backend (.env)**
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rentmate

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Email Service (Gmail)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password

# Server
PORT=3000
NODE_ENV=development
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=RentMate
```

### Gmail App Password Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App-specific password
3. Use the 16-character password in your `.env` file

---

## Usage

### For Landlords

1. **Register/Login** → Create landlord account
2. **Add Property** → List property with details, location, rent, amenities, and photos
3. **Manage Applications** → Review and accept/reject tenant applications
4. **Track Tenants** → View all applications received for your properties

### For Tenants

1. **Register/Login** → Create tenant account
2. **Search Properties** → Filter by location, price, amenities
3. **Apply** → Submit application with message
4. **Find Roommates** → Use compatibility matching to find co-sharers
5. **Track Applications** → Monitor application status

### For Admins

1. **Login** → Access admin dashboard
2. **Monitor Activity** → View platform statistics and user activity
3. **Manage Users** → Verify and manage user accounts
4. **View Reports** → Track system health and performance

---

## Advantages

1. **Simplified Rental Process** – One unified platform for all rental needs
2. **Smart Roommate Matching** – AI-powered compatibility algorithm for finding co-sharers
3. **Enhanced User Satisfaction** – Preference-based filtering minimizes conflicts
4. **Time-Saving** – Quick property discovery and application process
5. **Secure & Verified** – JWT authentication and data encryption
6. **User-Friendly Interface** – Intuitive design with responsive UI (Clean UI Award Winner)
7. **Comprehensive Features** – All rental management tools in one place
8. **Real-time Updates** – Live property listings and application status

---

## Challenges Addressed

| Challenge | Solution |
|-----------|----------|
| **Ensuring real-time updates** | Optimized database queries with MongoDB indexing |
| **Handling large-scale user data** | Implemented pagination and lazy loading |
| **User data verification** | JWT tokens and email-based OTP verification |
| **Responsive design** | Mobile-first CSS approach with flexbox/grid |
| **Security concerns** | bcrypt password hashing, JWT tokens, CORS protection |
| **Performance optimization** | Pagination, caching strategies, optimized queries |

---

## Future Enhancements

### Phase 2 - Mobile App
- [ ] Native mobile applications (iOS & Android)
- [ ] Push notifications for application updates
- [ ] In-app messaging system

### Phase 3 - AI & Recommendations
- [ ] Machine learning for property recommendations
- [ ] Advanced roommate compatibility scoring
- [ ] Predictive rent price analysis

### Phase 4 - Financial Integration
- [ ] Online rent payment system
- [ ] Digital lease agreements
- [ ] Expense splitting calculator

### Phase 5 - Platform Extensions
- [ ] Maintenance ticketing system
- [ ] Property inspection scheduling
- [ ] Document management (leases, agreements)
- [ ] Review & rating system
- [ ] Chat/video call integration

### Phase 6 - Analytics & Insights
- [ ] Landlord dashboard analytics
- [ ] Rental market insights
- [ ] Property value estimation
- [ ] Demand forecasting

---

## Team

This project is a collaborative effort by a talented team of 4 developers at **MERNathon Hackathon (Naan Mudhalvan, Government of Tamil Nadu)**.

| Role | Name | GitHub |
|------|------|--------|
| Full Stack Developer | [Aswin Raj](https://github.com/AswinRaj1123) | [@AswinRaj1123](https://github.com/AswinRaj1123) |
| Contributing Members | Team Members | - |

### Achievements
- **Clean UI Award** – MERNathon Hackathon 2024
- Full MERN stack implementation
- Production-ready codebase

---

## Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Guidelines
- Follow the existing code style and structure
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes before submitting PR
- Update documentation if needed

### Reporting Issues
If you find a bug, please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

---

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## Support & Contact

For questions, suggestions, or support:
- **GitHub Issues:** [Open an issue](https://github.com/AswinRaj1123/RentMate/issues)
- **Email:** techforindia.net@gmail.com

---

## Acknowledgments

- **Naan Mudhalvan** (Government of Tamil Nadu) for organizing MERNathon Hackathon
- **MongoDB** for powerful NoSQL capabilities
- **React** and **Node.js** communities for excellent documentation
- Our mentors and judges for valuable feedback

---

## Project Statistics

- **Total Lines of Code:** 2000+
- **API Endpoints:** 30+
- **Database Collections:** 5
- **Frontend Components:** 15+
- **Development Time:** Hackathon Duration
- **Team Size:** 4 developers

---

<div align="center">

### Made with passion by the RentMate Team

If you like this project, please give it a star!

[⬆ Back to Top](#rentmate--property-rental-management-system)

</div>

---

**Last Updated:** January 2, 2026  
**Version:** 1.0.0  
**Status:** Active Development