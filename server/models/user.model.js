const mongoose = require('mongoose');
const { Schema } = mongoose;

// User roles
const UserRole = {
  TENANT: 'tenant',
  LANDLORD: 'landlord',
  ADMIN: 'admin'
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.TENANT
    },
    profilePicture: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  UserRole
};
