import mongoose, { Document, Schema } from 'mongoose';

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue'
}

export interface IRentShare extends Document {
  lease: mongoose.Types.ObjectId;
  tenant: mongoose.Types.ObjectId;
  dueDate: Date;
  amount: number;
  status: PaymentStatus;
  paymentDate?: Date;
  paymentMethod?: string;
  transactionId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const rentShareSchema = new Schema<IRentShare>(
  {
    lease: {
      type: Schema.Types.ObjectId,
      ref: 'Lease',
      required: [true, 'Lease is required']
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Tenant is required']
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required']
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative']
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING
    },
    paymentDate: {
      type: Date
    },
    paymentMethod: {
      type: String
    },
    transactionId: {
      type: String
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for common queries
rentShareSchema.index({ tenant: 1 });
rentShareSchema.index({ lease: 1 });
rentShareSchema.index({ status: 1 });
rentShareSchema.index({ dueDate: 1 });

const RentShare = mongoose.model<IRentShare>('RentShare', rentShareSchema);

export default RentShare;