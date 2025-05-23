import mongoose, { Document, Schema } from 'mongoose';

export enum UserRole {
  TENANT = 'tenant',
  LANDLORD = 'landlord',
  ADMIN = 'admin'
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profilePicture?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
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
      type: String
    },
    phone: {
      type: String,
      match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number']
    },
    address: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Create index for email for faster queries
userSchema.index({ email: 1 });

const User = mongoose.model<IUser>('User', userSchema);

export default User;