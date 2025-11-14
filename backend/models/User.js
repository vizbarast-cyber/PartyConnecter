const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['organizer', 'participant', 'both', 'admin'],
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profile: {
    images: [{
      url: String,
      order: Number,
    }],
    bio: {
      type: String,
      maxlength: 200,
    },
    age: Number,
    gender: String,
    interests: [String],
    city: String,
    distancePreference: Number, // in km
  },
  verification: {
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    idPhotoUrl: String,
    selfieUrl: String,
    birthDate: Date,
    age: Number,
    submittedAt: Date,
    reviewedAt: Date,
    reviewedBy: String, // admin userId
    rejectionReason: String,
  },
  blockedUsers: [{
    type: String, // userId
  }],
  likedParties: [{
    partyId: String,
    likedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);

