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
  landlord: mongoose.Types.ObjectId;
  tenant: mongoose.Types.ObjectId;
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
      required: true 
    },
    landlord: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    tenant: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    monthlyRent: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    status: { 
      type: String, 
      enum: Object.values(LeaseStatus), 
      default: LeaseStatus.PENDING 
    },
    documents: [{ type: String }],
    terms: { type: String, required: true }
  },
  { timestamps: true }
);

const Lease = mongoose.model<ILease>('Lease', leaseSchema);

export default Lease;
