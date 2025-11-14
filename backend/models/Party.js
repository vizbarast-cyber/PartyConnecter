const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  organizerId: {
    type: String,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  pricePerPerson: {
    type: Number,
    required: true,
    min: 0,
  },
  maxParticipants: {
    type: Number,
    required: true,
    min: 1,
  },
  location: {
    address: String, // Hidden until payment
    coordinates: {
      lat: Number,
      lng: Number,
    },
    city: String,
    country: String,
  },
  images: [{
    url: String,
    order: Number,
  }],
  musicType: String,
  dressCode: String,
  ageRange: {
    min: Number,
    max: Number,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'full', 'cancelled', 'completed', 'expired'],
    default: 'draft',
  },
  requests: [{
    userId: String,
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    respondedAt: Date,
  }],
  participants: [{
    userId: String,
    joinedAt: Date,
    paymentId: String,
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'refunded'],
      default: 'pending',
    },
    arrivalConfirmed: {
      type: Boolean,
      default: false,
    },
    arrivalConfirmedAt: Date,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  publishedAt: Date,
});

partySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Auto-update status based on participants
  if (this.participants.length >= this.maxParticipants && this.status === 'published') {
    this.status = 'full';
  }
  
  next();
});

module.exports = mongoose.model('Party', partySchema);

