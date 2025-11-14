// Database indexes for performance
require('dotenv').config();
const mongoose = require('mongoose');

// Import models
const User = require('../backend/models/User');
const Party = require('../backend/models/Party');
const Payment = require('../backend/models/Payment');

async function createIndexes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/partyconnect');
    console.log('Connected to MongoDB');

    // User indexes
    await User.collection.createIndex({ userId: 1 }, { unique: true });
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ 'verification.status': 1 });
    await User.collection.createIndex({ role: 1 });
    console.log('✅ User indexes created');

    // Party indexes
    await Party.collection.createIndex({ organizerId: 1 });
    await Party.collection.createIndex({ status: 1 });
    await Party.collection.createIndex({ date: 1 });
    await Party.collection.createIndex({ 'location.city': 1 });
    await Party.collection.createIndex({ createdAt: -1 });
    await Party.collection.createIndex({ 'participants.userId': 1 });
    console.log('✅ Party indexes created');

    // Payment indexes
    await Payment.collection.createIndex({ userId: 1 });
    await Payment.collection.createIndex({ partyId: 1 });
    await Payment.collection.createIndex({ status: 1 });
    await Payment.collection.createIndex({ providerTransactionId: 1 });
    await Payment.collection.createIndex({ createdAt: -1 });
    console.log('✅ Payment indexes created');

    console.log('\n🎉 All indexes created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating indexes:', error);
    process.exit(1);
  }
}

createIndexes();

