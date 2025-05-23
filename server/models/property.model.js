const mongoose = require('mongoose');
const { Schema } = mongoose;

// Property types
const PropertyType = {
  APARTMENT: 'apartment',
  HOUSE: 'house',
  CONDO: 'condo',
  TOWNHOUSE: 'townhouse',
  OTHER: 'other'
};

const propertySchema = new Schema(
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
      min: [1, 'Area must be positive']
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
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

const Property = mongoose.model('Property', propertySchema);

module.exports = {
  Property,
  PropertyType
};
