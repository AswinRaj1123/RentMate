import mongoose, { Document, Schema } from 'mongoose';

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  CONDO = 'condo',
  ROOM = 'room',
  STUDIO = 'studio',
  OTHER = 'other'
}

export interface IProperty extends Document {
  title: string;
  description: string;
  propertyType: PropertyType;
  owner: mongoose.Types.ObjectId;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  price: number;
  size: number; // in sq ft/m
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  isVerified: boolean;
  isPromoted: boolean;
  availableFrom: Date;
  shareable: boolean; // Whether this property is available for rent sharing
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    propertyType: { 
      type: String, 
      enum: Object.values(PropertyType), 
      required: true 
    },
    owner: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      coordinates: {
        latitude: { type: Number },
        longitude: { type: Number }
      }
    },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    amenities: [{ type: String }],
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    isPromoted: { type: Boolean, default: false },
    availableFrom: { type: Date, required: true },
    shareable: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Add text indexes for search functionality
propertySchema.index({ 
  title: 'text', 
  description: 'text', 
  'address.city': 'text', 
  'address.state': 'text' 
});

const Property = mongoose.model<IProperty>('Property', propertySchema);

export default Property;
