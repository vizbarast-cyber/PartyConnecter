const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  partyId: {
    type: String,
    required: true,
    index: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },
  netAmount: {
    type: Number,
    required: true,
  },
  provider: {
    type: String,
    enum: ['stripe', 'paypal'],
    required: true,
  },
  providerTransactionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'refunded', 'released'],
    default: 'pending',
  },
  escrowStatus: {
    type: String,
    enum: ['held', 'released', 'refunded'],
    default: 'held',
  },
  arrivalConfirmed: {
    type: Boolean,
    default: false,
  },
  arrivalConfirmedAt: Date,
  releasedAt: Date,
  refundedAt: Date,
  refundReason: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);

