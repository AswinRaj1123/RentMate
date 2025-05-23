import mongoose, { Document, Schema } from 'mongoose';

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  CONDO = 'condo',
  TOWNHOUSE = 'townhouse',
  OTHER = 'other'
}

export interface IProperty extends Document {
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq ft
  rent: number; // monthly rent
  deposit: number;
  availableFrom: Date;
  furnished: boolean;
  petFriendly: boolean;
  parking: boolean;
  images: string[];
  amenities: string[];
  landlord: mongoose.Types.ObjectId;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required'],
      trim: true
    },
    propertyType: {
      type: String,
      enum: Object.values(PropertyType),
      required: [true, 'Property type is required']
    },
    bedrooms: {
      type: Number,
      required: [true, 'Number of bedrooms is required'],
      min: [0, 'Bedrooms cannot be negative']
    },
    bathrooms: {
      type: Number,
      required: [true, 'Number of bathrooms is required'],
      min: [0, 'Bathrooms cannot be negative']
    },
    area: {
      type: Number,
      required: [true, 'Area is required'],
      min: [0, 'Area cannot be negative']
    },
    rent: {
      type: Number,
      required: [true, 'Rent is required'],
      min: [0, 'Rent cannot be negative']
    },
    deposit: {
      type: Number,
      required: [true, 'Deposit is required'],
      min: [0, 'Deposit cannot be negative']
    },
    availableFrom: {
      type: Date,
      required: [true, 'Available from date is required']
    },
    furnished: {
      type: Boolean,
      default: false
    },
    petFriendly: {
      type: Boolean,
      default: false
    },
    parking: {
      type: Boolean,
      default: false
    },
    images: {
      type: [String],
      default: []
    },
    amenities: {
      type: [String],
      default: []
    },
    landlord: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Landlord is required']
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for common search queries
propertySchema.index({ city: 1, state: 1 });
propertySchema.index({ rent: 1 });
propertySchema.index({ bedrooms: 1 });
propertySchema.index({ isAvailable: 1 });

const Property = mongoose.model<IProperty>('Property', propertySchema);

export default Property;