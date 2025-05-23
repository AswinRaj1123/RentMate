import mongoose, { Document, Schema } from 'mongoose';

export enum LeaseStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  EXPIRED = 'expired',
  TERMINATED = 'terminated',
  REJECTED = 'rejected'
}

export interface ILease extends Document {
  property: mongoose.Types.ObjectId;
  tenant: mongoose.Types.ObjectId;
  landlord: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  securityDeposit: number;
  status: LeaseStatus;
  documents: string[];
  terms: string;
  createdAt: Date;
  updatedAt: Date;
}

const leaseSchema = new Schema<ILease>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Property is required']
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Tenant is required']
    },
    landlord: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Landlord is required']
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    },
    monthlyRent: {
      type: Number,
      required: [true, 'Monthly rent is required'],
      min: [0, 'Monthly rent cannot be negative']
    },
    securityDeposit: {
      type: Number,
      required: [true, 'Security deposit is required'],
      min: [0, 'Security deposit cannot be negative']
    },
    status: {
      type: String,
      enum: Object.values(LeaseStatus),
      default: LeaseStatus.PENDING
    },
    documents: {
      type: [String],
      default: []
    },
    terms: {
      type: String,
      required: [true, 'Lease terms are required']
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for common queries
leaseSchema.index({ tenant: 1 });
leaseSchema.index({ landlord: 1 });
leaseSchema.index({ property: 1 });
leaseSchema.index({ status: 1 });

const Lease = mongoose.model<ILease>('Lease', leaseSchema);

export default Lease;