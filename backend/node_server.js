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
      expiresIn: tokenExpiry
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
  amenities: { type: [String] }, // Array of amenities
  photos: { type: [String] }, // Array of photo URLs
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