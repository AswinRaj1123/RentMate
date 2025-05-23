const mongoose = require('mongoose');
const { Schema } = mongoose;

// Lease status enum
const LeaseStatus = {
  PENDING: 'pending',
  ACTIVE: 'active',
  EXPIRED: 'expired',
  TERMINATED: 'terminated',
  REJECTED: 'rejected'
};

const leaseSchema = new Schema(
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

const Lease = mongoose.model('Lease', leaseSchema);

module.exports = {
  Lease,
  LeaseStatus
};
