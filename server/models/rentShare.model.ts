import mongoose, { Document, Schema } from 'mongoose';

export enum RentShareStatus {
  LOOKING = 'looking',
  MATCHED = 'matched',
  CLOSED = 'closed'
}

export interface IRentShare extends Document {
  user: mongoose.Types.ObjectId;
  property?: mongoose.Types.ObjectId; // Optional - can be looking for property or have one
  preferences: {
    location: {
      city: string;
      state: string;
      zipCodes?: string[];
    };
    priceRange: {
      min: number;
      max: number;
    };
    moveInDate: Date;
    duration: number; // in months
    roomPreferences?: string[];
    amenities?: string[];
  };
  description: string;
  status: RentShareStatus;
  matches: mongoose.Types.ObjectId[]; // Other RentShare listings that match
  createdAt: Date;
  updatedAt: Date;
}

const rentShareSchema = new Schema<IRentShare>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    },
    preferences: {
      location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCodes: [{ type: String }],
      },
      priceRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
      },
      moveInDate: { type: Date, required: true },
      duration: { type: Number, required: true },
      roomPreferences: [{ type: String }],
      amenities: [{ type: String }],
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(RentShareStatus),
      default: RentShareStatus.LOOKING,
    },
    matches: [{ type: Schema.Types.ObjectId, ref: 'RentShare' }],
  },
  { timestamps: true }
);

// Add text index for searching
rentShareSchema.index({
  description: 'text',
  'preferences.location.city': 'text',
  'preferences.location.state': 'text',
});

const RentShare = mongoose.model<IRentShare>('RentShare', rentShareSchema);

export default RentShare;
