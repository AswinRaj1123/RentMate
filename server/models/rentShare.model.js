const mongoose = require('mongoose');
const { Schema } = mongoose;

// Payment status enum
const PaymentStatus = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue'
};

const rentShareSchema = new Schema(
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

const RentShare = mongoose.model('RentShare', rentShareSchema);

module.exports = {
  RentShare,
  PaymentStatus
};
