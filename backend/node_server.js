// Import dependencies
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// MongoDB connection URI
const uri = "mongodb+srv://aswinraj868_db_user:4MIltIc2G4onDB2j@rentmate.wtblwkg.mongodb.net/?retryWrites=true&w=majority&appName=RentMate";

// Initialize express app
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ✅ Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

  // CORS Middleware
  const cors = require("cors");
app.use(cors({
  origin: ["https://rentmate-six.vercel.app", "http://localhost:5173"], // Remove trailing slash and add localhost for development
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Health check API
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is healthy 🚀",
    timestamp: new Date()
  });
});

// ----------------------------------------------------------------------------------------------
// User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  occupation: { type: String, required: true },
  role: { type: String, enum: ["Tenant", "Landlord", "Admin"], required: true }
}, { collection: "users" });

const User = mongoose.model("User", userSchema);

// ----------------------------------------------------------------------------------------------
// Authentication Middleware
const JWT_SECRET = "your_jwt_secret_key"; // TODO: move to .env in production

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) return res.status(401).json({ error: "No token, authorization denied" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = decoded; // { userId, role }
    next();
  });
}

// ----------------------------------------------------------------------------------------------
// API: Register User
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, phone, password, gender, occupation, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      gender,
      occupation,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", userId: newUser._id });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------------------------------------------------------------------------------
// API: Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Expiry: 1h or 7d
    const tokenExpiry = rememberMe ? "7d" : "1h";

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: tokenExpiry }
    );

    res.status(200).json({
      message: "✅ Login successful",
      token,
      expiresIn: tokenExpiry,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: "Failed to login" });
  }
});

// ----------------------------------------------------------------------------------------------
// Property Schema & Model
// Define Property Schema
const propertySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  numberOfTenants: { type: Number, required: true },
  location: { type: String, required: true },
  rent: { type: Number, required: true },
  description: { type: String },
  amenities: { type: [String] },
  photos: { type: [String] },
  // ✅ Add this field
  roomSharing: [
    {
      ambience: { type: String, required: true },
      sharingOption: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema, "property");

// POST API to add new property
app.post("/api/property", async (req, res) => {
  try {
    const { userId, title, numberOfTenants, location, rent, description, amenities, photos } = req.body;

    if (!userId || !title || !numberOfTenants || !location || !rent) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const newProperty = new Property({
      userId,
      title,
      numberOfTenants,
      location,
      rent,
      description,
      amenities,
      photos,
    });

    const savedProperty = await newProperty.save();
    res.status(201).json({ message: "Property saved successfully", property: savedProperty });
  } catch (err) {
    console.error("❌ Error saving property:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ----------------------------------------------------------------------------------------------
// GET API to fetch properties by userId
app.get("/api/property/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const properties = await Property.find({ userId });

    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: "No properties found for this user" });
    }

    res.status(200).json({ properties });
  } catch (err) {
    console.error("❌ Error fetching properties:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// ----------------------------------------------------------------------------------------------
// OTP Schema & Model
const nodemailer = require("nodemailer");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // OTP expires in 5 minutes
});
const OTP = mongoose.model("OTP", otpSchema, "otp");

// ----------------------------------------------------------------------------------------------
// Nodemailer Transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 456,
  secure: true,
  auth: {
    user: "techforindia.net@gmail.com",       // ✅ your Gmail address
    pass: "cgwk eikk aowe ozbf"           // ✅ App Password from Google
  },
  tls: {
    rejectUnauthorized: false // ✅ allow self-signed certs
  }
});

// Helper: Generate 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit number
}

// Helper: Send OTP Email
async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: '"RentMate" <your_email@gmail.com>', // sender name + email
    to: email,
    subject: "Your OTP Code - RentMate",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 OTP sent to ${email}`);
}

// ----------------------------------------------------------------------------------------------
// API: Request OTP (Register Step 1 - Send OTP)
app.post("/api/request-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Generate new OTP
    const otp = generateOTP();

    // Remove any existing OTP for this email
    await OTP.deleteMany({ email });

    // Save new OTP
    const newOTP = new OTP({ email, otp });
    await newOTP.save();

    // Send OTP via email
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ OTP Request Error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// ----------------------------------------------------------------------------------------------
// API: Verify OTP (Register Step 2 - Verify OTP)
app.post("/api/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });

    const existingOTP = await OTP.findOne({ email, otp });
    if (!existingOTP) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // OTP is valid → delete OTP after verification
    await OTP.deleteMany({ email });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("❌ OTP Verification Error:", err);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

// ----------------------------------------------------------------------------------------------
// API: Resend OTP (if user didn’t receive OTP)
app.post("/api/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Generate new OTP
    const otp = generateOTP();

    // Replace old OTP
    await OTP.deleteMany({ email });
    const newOTP = new OTP({ email, otp });
    await newOTP.save();

    // Send OTP via email
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "New OTP sent successfully" });
  } catch (err) {
    console.error("❌ Resend OTP Error:", err);
    res.status(500).json({ error: "Failed to resend OTP" });
  }
});

// ----------------------------------------------------------------------------------------------
// 1. API: Forgot Password (Send OTP for password reset)

app.post("/api/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if user exists with this email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No account found with this email address" });
    }

    // Generate new 4-digit OTP for password reset
    const otp = generateOTP();

    // Remove any existing OTP for this email
    await OTP.deleteMany({ email });

    // Save new OTP
    const newOTP = new OTP({ email, otp });
    await newOTP.save();

    // Send OTP via email
    const mailOptions = {
      from: '"RentMate" <techforindia.net@gmail.com>',
      to: email,
      subject: "Password Reset OTP - RentMate",
      text: `Your password reset OTP is ${otp}. It will expire in 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c2c2c;">Password Reset Request</h2>
          <p>You requested to reset your password for your RentMate account.</p>
          <p>Your 4-digit OTP code is: <strong style="font-size: 24px; color: #2c2c2c;">${otp}</strong></p>
          <p style="color: #666;">This code will expire in 5 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Password reset OTP sent to ${email}`);

    res.status(200).json({ 
      message: "Password reset OTP sent successfully to your email",
      email: email // Return email for frontend to use in next step
    });
  } catch (err) {
    console.error("❌ Forgot Password Error:", err);
    res.status(500).json({ error: "Failed to send password reset OTP" });
  }
});

// ----------------------------------------------------------------------------------------------
// STEP 2: API: Verify OTP and Reset Password
app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;
    
    // Validate all required fields
    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ 
        error: "Email, OTP, new password, and confirm password are all required" 
      });
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "New password and confirm password do not match" });
    }

    // Validate password strength (optional - add your requirements)
    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Verify OTP
    const existingOTP = await OTP.findOne({ email, otp });
    if (!existingOTP) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Verify user still exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password in database
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Delete OTP after successful password reset
    await OTP.deleteMany({ email });

    console.log(`✅ Password reset successful for ${email}`);

    res.status(200).json({ 
      message: "Password reset successfully! You can now sign in with your new password.",
      success: true
    });
  } catch (err) {
    console.error("❌ Reset Password Error:", err);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

// ----------------------------------------------------------------------------------------------
// STEP 2.5: API: Verify OTP Only (Optional - for better UX)
app.post("/api/verify-reset-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    // Verify OTP exists and is valid
    const existingOTP = await OTP.findOne({ email, otp });
    if (!existingOTP) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    res.status(200).json({ 
      message: "OTP verified successfully. You can now set your new password.",
      verified: true 
    });
  } catch (err) {
    console.error("❌ Verify Reset OTP Error:", err);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

// ----------------------------------------------------------------------------------------------
// API: Resend OTP for Password Reset
app.post("/api/resend-reset-otp", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No account found with this email address" });
    }

    // Generate new OTP
    const otp = generateOTP();

    // Replace old OTP
    await OTP.deleteMany({ email });
    const newOTP = new OTP({ email, otp });
    await newOTP.save();

    // Send new OTP via email
    const mailOptions = {
      from: '"RentMate" <techforindia.net@gmail.com>',
      to: email,
      subject: "New Password Reset OTP - RentMate",
      text: `Your new password reset OTP is ${otp}. It will expire in 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c2c2c;">New Password Reset OTP</h2>
          <p>Your new 4-digit OTP code is: <strong style="font-size: 24px; color: #2c2c2c;">${otp}</strong></p>
          <p style="color: #666;">This code will expire in 5 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 New password reset OTP sent to ${email}`);

    res.status(200).json({ message: "New OTP sent successfully" });
  } catch (err) {
    console.error("❌ Resend Reset OTP Error:", err);
    res.status(500).json({ error: "Failed to resend OTP" });
  }
});

// ----------------------------------------------------------------------------------------------
// 2. API: Search Properties with Filters (price and location)
app.get("/api/search-properties", async (req, res) => {
  try {
    const { location, minPrice, maxPrice, numberOfTenants, page = 1, limit = 10 } = req.query;

    // Build search query
    let searchQuery = {};

    // Location filter (case-insensitive partial match)
    if (location) {
      searchQuery.location = { $regex: location, $options: 'i' };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      searchQuery.rent = {};
      if (minPrice) searchQuery.rent.$gte = parseInt(minPrice);
      if (maxPrice) searchQuery.rent.$lte = parseInt(maxPrice);
    }

    // Number of tenants filter
    if (numberOfTenants) {
      searchQuery.numberOfTenants = parseInt(numberOfTenants);
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute search with pagination
    const properties = await Property.find(searchQuery)
      .populate('userId', 'name email phone') // Get owner details
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }); // Latest first

    // Get total count for pagination
    const totalProperties = await Property.countDocuments(searchQuery);

    res.status(200).json({
      properties,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProperties / parseInt(limit)),
        totalProperties,
        hasNextPage: skip + properties.length < totalProperties,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (err) {
    console.error("❌ Search Properties Error:", err);
    res.status(500).json({ error: "Failed to search properties" });
  }
});

// ----------------------------------------------------------------------------------------------
// 3. API: Get All Details of Particular Property
app.get("/api/property/details/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Validate propertyId
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    // Find property with owner details
    const property = await Property.findById(propertyId)
      .populate('userId', 'name email phone role'); // Get owner details

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ property });
  } catch (err) {
    console.error("❌ Get Property Details Error:", err);
    res.status(500).json({ error: "Failed to get property details" });
  }
});

// ----------------------------------------------------------------------------------------------
// Application Schema & Model
const applicationSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Accepted", "Rejected"], 
    default: "Pending" 
  },
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema, "applications");

// ----------------------------------------------------------------------------------------------
// 4. API: Get Applications for Particular Property
app.get("/api/property/:propertyId/applications", async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Validate propertyId
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Get all applications for this property
    const applications = await Application.find({ propertyId })
      .populate('applicantId', 'name email phone gender occupation') // Get applicant details
      .populate('propertyId', 'title location rent') // Get property details
      .sort({ appliedAt: -1 }); // Latest first

    res.status(200).json({ 
      applications,
      totalApplications: applications.length 
    });
  } catch (err) {
    console.error("❌ Get Applications Error:", err);
    res.status(500).json({ error: "Failed to get applications" });
  }
});

// ----------------------------------------------------------------------------------------------
// 5. API: Create Application for Particular Property
app.post("/api/property/:propertyId/apply", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { applicantId, message } = req.body;

    // Validate required fields
    if (!applicantId || !message) {
      return res.status(400).json({ error: "Applicant ID and message are required" });
    }

    // Validate propertyId
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    // Validate applicantId
    if (!mongoose.Types.ObjectId.isValid(applicantId)) {
      return res.status(400).json({ error: "Invalid applicant ID" });
    }

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Check if applicant exists
    const applicant = await User.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ error: "Applicant not found" });
    }

    // Check if user already applied for this property
    const existingApplication = await Application.findOne({ 
      propertyId, 
      applicantId 
    });
    
    if (existingApplication) {
      return res.status(400).json({ error: "You have already applied for this property" });
    }

    // Create new application
    const newApplication = new Application({
      propertyId,
      applicantId,
      message,
      status: "Pending"
    });

    const savedApplication = await newApplication.save();

    // Populate the saved application with details
    const populatedApplication = await Application.findById(savedApplication._id)
      .populate('applicantId', 'name email phone')
      .populate('propertyId', 'title location rent');

    res.status(201).json({ 
      message: "Application submitted successfully", 
      application: populatedApplication 
    });
  } catch (err) {
    console.error("❌ Create Application Error:", err);
    res.status(500).json({ error: "Failed to create application" });
  }
});

// ----------------------------------------------------------------------------------------------
// BONUS API: Update Application Status (Accept/Reject)
app.patch("/api/applications/:applicationId/status", async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body; // "Accepted" or "Rejected"

    // Validate status
    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Status must be 'Accepted' or 'Rejected'" });
    }

    // Update application status
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    ).populate('applicantId', 'name email phone')
     .populate('propertyId', 'title location rent');

    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({ 
      message: `Application ${status.toLowerCase()} successfully`, 
      application: updatedApplication 
    });
  } catch (err) {
    console.error("❌ Update Application Status Error:", err);
    res.status(500).json({ error: "Failed to update application status" });
  }
});

// members sharing option
// ----------------------------------------------------------------------------------------------
// Room Sharing Schema & Model (embedded in Property for simplicity)

app.post("/api/property/:propertyId/room-sharing", async (req, res) => {
  const { propertyId } = req.params;
  const { ambience, sharingOption } = req.body;

  if (!ambience || !sharingOption) {
    return res.status(400).json({ error: "Ambience and sharing option are required" });
  }

  // Example schema-less storage inside Property for now
  const property = await Property.findByIdAndUpdate(
    propertyId,
    { $push: { roomSharing: { ambience, sharingOption, createdAt: new Date() } } },
    { new: true, upsert: false }
  );

  if (!property) {
    return res.status(404).json({ error: "Property not found" });
  }

  res.status(201).json({ message: "Room sharing created successfully", property });
});

// ----------------------------------------------------------------------------------------------
// DELETE API to remove a property
app.delete("/api/property/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }
    const deleted = await Property.findByIdAndDelete(propertyId);
    if (!deleted) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete property" });
  }
});

// ----------------------------------------------------------------------
// API: Get All Applications for Landlord's Properties
app.get("/api/landlord/:landlordId/applications", async (req, res) => {
  try {
    const { landlordId } = req.params;
    const { status, page = 1, limit = 10 } = req.query;

    // Validate landlordId
    if (!mongoose.Types.ObjectId.isValid(landlordId)) {
      return res.status(400).json({ error: "Invalid landlord ID" });
    }

    // First, find all properties owned by this landlord
    const landlordProperties = await Property.find({ userId: landlordId });
    
    if (landlordProperties.length === 0) {
      return res.status(200).json({ 
        applications: [], 
        totalApplications: 0,
        message: "No properties found for this landlord" 
      });
    }

    // Get all property IDs
    const propertyIds = landlordProperties.map(property => property._id);

    // Build query for applications
    let applicationQuery = { propertyId: { $in: propertyIds } };
    
    // Filter by status if provided
    if (status && ["Pending", "Accepted", "Rejected"].includes(status)) {
      applicationQuery.status = status;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get applications with populated data
    const applications = await Application.find(applicationQuery)
      .populate('applicantId', 'name email phone gender occupation')
      .populate('propertyId', 'title location rent numberOfTenants')
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalApplications = await Application.countDocuments(applicationQuery);

    res.status(200).json({
      applications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalApplications / parseInt(limit)),
        totalApplications,
        hasNextPage: skip + applications.length < totalApplications,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (err) {
    console.error("❌ Get Landlord Applications Error:", err);
    res.status(500).json({ error: "Failed to get applications" });
  }
});

// ----------------------------------------------------------------------------------------------
// API: Update Application Status (Accept/Reject) by Landlord
app.patch("/api/applications/:applicationId/status", async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, landlordId } = req.body; // Added landlordId for verification

    // Validate applicationId
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ error: "Invalid application ID" });
    }

    // Validate status
    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Status must be 'Accepted' or 'Rejected'" });
    }

    // Find the application with property details
    const application = await Application.findById(applicationId)
      .populate('propertyId', 'userId title location rent');

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Verify that the landlord owns this property (optional security check)
    if (landlordId && application.propertyId.userId.toString() !== landlordId) {
      return res.status(403).json({ error: "Unauthorized: You don't own this property" });
    }

    // Update application status
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status, updatedAt: new Date() },
      { new: true }
    ).populate('applicantId', 'name email phone gender occupation')
     .populate('propertyId', 'title location rent numberOfTenants');

    // Optional: Send notification email to applicant (you can implement this later)
    const statusMessage = status === "Accepted" ? "accepted" : "rejected";
    console.log(`📧 Application ${statusMessage} for ${updatedApplication.propertyId.title}`);

    res.status(200).json({ 
      message: `Application ${statusMessage} successfully`, 
      application: updatedApplication 
    });
  } catch (err) {
    console.error("❌ Update Application Status Error:", err);
    res.status(500).json({ error: "Failed to update application status" });
  }
});

// ----------------------------------------------------------------------------------------------
// API: Get Application Details by ID (for landlord to view full details)
app.get("/api/applications/:applicationId", async (req, res) => {
  try {
    const { applicationId } = req.params;

    // Validate applicationId
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ error: "Invalid application ID" });
    }

    // Find application with all details
    const application = await Application.findById(applicationId)
      .populate('applicantId', 'name email phone gender occupation role')
      .populate('propertyId', 'title location rent numberOfTenants description amenities photos userId')
      .populate('propertyId.userId', 'name email phone'); // Populate landlord details too

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({ application });
  } catch (err) {
    console.error("❌ Get Application Details Error:", err);
    res.status(500).json({ error: "Failed to get application details" });
  }
});

// ----------------------------------------------------------------------
// API: Get All Properties by Landlord
app.get("/api/landlord/:landlordId/properties", async (req, res) => {
  try {
    const { landlordId } = req.params;

    // Validate landlordId
    if (!mongoose.Types.ObjectId.isValid(landlordId)) {
      return res.status(400).json({ error: "Invalid landlord ID" });
    }

    // Find properties
    const properties = await Property.find({ userId: landlordId })
      .select("title location rent description photos");

    if (!properties || properties.length === 0) {
      return res.status(200).json({ properties: [] });
    }

    res.status(200).json({ properties });
  } catch (err) {
    console.error("❌ Get Landlord Properties Error:", err);
    res.status(500).json({ error: "Failed to get properties" });
  }
});

// ✅ Add this endpoint to get all properties
app.get("/api/properties", async (req, res) => {
  try {
    console.log("🔍 Fetching all properties");
    
    // Find all properties and populate userId with user details
    const properties = await Property.find({}).populate('userId', 'name email role');
    
    console.log(`✅ Found ${properties.length} properties`);
    
    res.status(200).json(properties);
    
  } catch (error) {
    console.error("❌ Error fetching properties:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch properties"
    });
  }
});

// Add this at the top with other dependencies (after existing requires)
const cosineSimilarity = require("cosine-similarity");

// ----------------------------------------------------------------------------------------------
// Roommate User Schema & Model (separate from main User schema)
const roommateUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  budget: { type: Number, required: true },
  location: { type: String, required: true },
  sleep_schedule: { type: String, enum: ["early", "late"], required: true },
  cleanliness: { type: Number, min: 1, max: 10, required: true },
  food: { type: String, enum: ["veg", "non-veg", "both"], required: true },
  social_level: { type: Number, min: 1, max: 10, required: true },
  age: { type: Number },
  occupation: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  bio: { type: String },
  interests: { type: [String] },
  isLookingForRoommate: { type: Boolean, default: true }
}, { 
  collection: "roommate_users",
  timestamps: true 
});

const RoommateUser = mongoose.model("RoommateUser", roommateUserSchema);

// ----------------------------------------------------------------------------------------------
// Helper Function for Encoding User Data
function encodeUser(user) {
  return [
    user.budget / 100000, // Normalize budget (assuming max budget is 1 lakh)
    user.cleanliness / 10, // Already 1-10 scale
    user.social_level / 10, // Already 1-10 scale
    user.sleep_schedule === "early" ? 1 : 0, // Binary encoding
    user.food === "veg" ? 1 : (user.food === "non-veg" ? 0 : 0.5), // Veg=1, Non-veg=0, Both=0.5
  ];
}

// ----------------------------------------------------------------------------------------------
// API: Register Roommate User
app.post("/api/roommate-users", async (req, res) => {
  try {
    const { 
      name, email, phone, budget, location, sleep_schedule, 
      cleanliness, food, social_level, age, occupation, gender, bio, interests 
    } = req.body;

    // Validate required fields
    if (!name || !email || !budget || !location || !sleep_schedule || 
        !cleanliness || !food || !social_level) {
      return res.status(400).json({ 
        error: "Name, email, budget, location, sleep_schedule, cleanliness, food, and social_level are required" 
      });
    }

    // Check if user already exists
    const existingUser = await RoommateUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Create new roommate user
    const newRoommateUser = new RoommateUser({
      name,
      email,
      phone,
      budget,
      location,
      sleep_schedule,
      cleanliness,
      food,
      social_level,
      age,
      occupation,
      gender,
      bio,
      interests: interests || []
    });

    await newRoommateUser.save();
    
    console.log(`✅ Roommate user created: ${name} (${email})`);
    
    res.status(201).json({ 
      message: "Roommate user created successfully", 
      userId: newRoommateUser._id,
      user: {
        id: newRoommateUser._id,
        name: newRoommateUser.name,
        email: newRoommateUser.email,
        location: newRoommateUser.location
      }
    });

  } catch (error) {
    console.error("Error creating roommate user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------------------------------------------------------------------------------
// API: Get Roommate Recommendations
app.get("/api/roommate-recommend/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 5 } = req.query; // Default to 5 recommendations

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Find target user
    const targetUser = await RoommateUser.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get target user vector
    const targetVec = encodeUser(targetUser);
    
    // Find all other users (excluding the target user)
    const candidates = await RoommateUser.find({ 
      _id: { $ne: userId },
      isLookingForRoommate: true 
    });

    if (candidates.length === 0) {
      return res.status(200).json({ 
        message: "No roommate candidates available",
        recommendations: [] 
      });
    }

    console.log(`🔍 Finding recommendations for ${targetUser.name}`);
    console.log(`Target vector:`, targetVec);
    console.log(`Found ${candidates.length} candidates`);

    // Calculate compatibility scores
    const scored = candidates
      .filter(candidate => {
        // Validate that all required fields exist and are valid
        return (
          typeof candidate.budget === "number" &&
          typeof candidate.cleanliness === "number" &&
          typeof candidate.social_level === "number" &&
          typeof candidate.sleep_schedule === "string" &&
          typeof candidate.food === "string"
        );
      })
      .map((candidate) => {
        try {
          const candidateVec = encodeUser(candidate);
          const score = cosineSimilarity(targetVec, candidateVec);
          const safeScore = typeof score === "number" && !isNaN(score) ? score : 0;
          
          return {
            userId: candidate._id,
            name: candidate.name,
            email: candidate.email,
            phone: candidate.phone,
            budget: candidate.budget,
            location: candidate.location,
            age: candidate.age,
            occupation: candidate.occupation,
            gender: candidate.gender,
            bio: candidate.bio,
            interests: candidate.interests,
            sleep_schedule: candidate.sleep_schedule,
            cleanliness: candidate.cleanliness,
            food: candidate.food,
            social_level: candidate.social_level,
            compatibilityScore: Math.round(safeScore * 100), // Convert to percentage
            matchReasons: generateMatchReasons(targetUser, candidate, safeScore)
          };
        } catch (error) {
          console.error(`Error processing candidate ${candidate._id}:`, error);
          return null;
        }
      })
      .filter(result => result !== null); // Remove failed calculations

    // Sort by compatibility score (highest first)
    scored.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    // Return top recommendations
    const recommendations = scored.slice(0, parseInt(limit));

    console.log(`✅ Found ${recommendations.length} recommendations`);

    res.status(200).json({ 
      recommendations,
      totalCandidates: candidates.length,
      targetUser: {
        name: targetUser.name,
        location: targetUser.location,
        budget: targetUser.budget
      }
    });

  } catch (error) {
    console.error("❌ Roommate recommendation error:", error);
    res.status(500).json({ error: "Failed to fetch roommate recommendations" });
  }
});

// ----------------------------------------------------------------------------------------------
// Helper Function: Generate Match Reasons
function generateMatchReasons(targetUser, candidate, score) {
  const reasons = [];
  
  // Budget compatibility
  const budgetDiff = Math.abs(targetUser.budget - candidate.budget);
  if (budgetDiff <= 10000) {
    reasons.push("Similar budget preferences");
  }
  
  // Location match
  if (targetUser.location.toLowerCase() === candidate.location.toLowerCase()) {
    reasons.push("Same preferred location");
  }
  
  // Sleep schedule match
  if (targetUser.sleep_schedule === candidate.sleep_schedule) {
    reasons.push("Compatible sleep schedules");
  }
  
  // Cleanliness compatibility
  const cleanlinessDiff = Math.abs(targetUser.cleanliness - candidate.cleanliness);
  if (cleanlinessDiff <= 2) {
    reasons.push("Similar cleanliness standards");
  }
  
  // Social level compatibility
  const socialDiff = Math.abs(targetUser.social_level - candidate.social_level);
  if (socialDiff <= 2) {
    reasons.push("Compatible social preferences");
  }
  
  // Food preferences
  if (targetUser.food === candidate.food || targetUser.food === "both" || candidate.food === "both") {
    reasons.push("Compatible food preferences");
  }
  
  // High overall compatibility
  if (score > 0.8) {
    reasons.push("Excellent overall compatibility");
  } else if (score > 0.6) {
    reasons.push("Good overall match");
  }
  
  return reasons.length > 0 ? reasons : ["Potential roommate match"];
}

// ----------------------------------------------------------------------------------------------
// API: Get Roommate User Profile
app.get("/api/roommate-users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await RoommateUser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Roommate user not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching roommate user:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// ----------------------------------------------------------------------------------------------
// API: Update Roommate User Profile
app.put("/api/roommate-users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Remove fields that shouldn't be updated
    delete updateData._id;
    delete updateData.__v;

    const updatedUser = await RoommateUser.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Roommate user not found" });
    }

    res.status(200).json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (error) {
    console.error("Error updating roommate user:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// ----------------------------------------------------------------------------------------------
// API: Get All Roommate Users (for admin or browsing)
app.get("/api/roommate-users", async (req, res) => {
  try {
    const { 
      location, 
      minBudget, 
      maxBudget, 
      food, 
      gender, 
      page = 1, 
      limit = 10 
    } = req.query;

    // Build filter query
    let filterQuery = { isLookingForRoommate: true };

    if (location) {
      filterQuery.location = { $regex: location, $options: 'i' };
    }

    if (minBudget || maxBudget) {
      filterQuery.budget = {};
      if (minBudget) filterQuery.budget.$gte = parseInt(minBudget);
      if (maxBudget) filterQuery.budget.$lte = parseInt(maxBudget);
    }

    if (food && food !== "both") {
      filterQuery.food = { $in: [food, "both"] };
    }

    if (gender) {
      filterQuery.gender = gender;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await RoommateUser.find(filterQuery)
      .select('-__v') // Exclude version field
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalUsers = await RoommateUser.countDocuments(filterQuery);

    res.status(200).json({
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalUsers / parseInt(limit)),
        totalUsers,
        hasNextPage: skip + users.length < totalUsers,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error("Error fetching roommate users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ----------------------------------------------------------------------------------------------
// API: Delete Roommate User
app.delete("/api/roommate-users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const deletedUser = await RoommateUser.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "Roommate user not found" });
    }

    res.status(200).json({ message: "Roommate user deleted successfully" });
  } catch (error) {
    console.error("Error deleting roommate user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});