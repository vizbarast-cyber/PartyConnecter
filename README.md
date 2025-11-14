# PartyConnect

A React Native mobile app for creating, discovering, and joining real-life parties with a Tinder-style swipe interface.

## Features

- 🎉 **Role-Based Access**: Organizer, Participant, or Both
- 🔐 **Identity Verification**: Mandatory ID verification for safety
- 💳 **Payment System**: Stripe and PayPal with escrow
- 📍 **Hidden Addresses**: Party locations hidden until payment
- 💬 **Real-Time Messaging**: Chat with organizers and participants
- 🎯 **Swipe Interface**: Tinder-style party discovery
- 🛡️ **Safety Features**: Blocking, reporting, and admin moderation
- 🛠️ **Developer Mode**: Secret dev tools (tap logo 10 times, password: tomasdievas)

## Tech Stack

### Mobile App
- React Native (Expo)
- React Navigation
- Firebase (Auth, Firestore, Storage, Messaging)
- Zustand (State Management)
- Stripe & PayPal Integration

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- Firebase Admin SDK
- Stripe SDK
- PayPal REST API

## Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- Firebase project configured
- Expo CLI

### Installation

1. Install dependencies:
```bash
npm install
cd backend && npm install
```

2. Configure environment variables:

Create `backend/.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/partyconnect
FIREBASE_PROJECT_ID=party-connect-q8z7m3
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
PAYPAL_CLIENT_ID=AQG6uInwsAVbZ-tSOvGSUg0stYzx0LUcFUWFlh_liD2ce1DYDnYMeXFlvBWLj6mSRbF-F-aAOqfy-gXS
PAYPAL_SECRET=ECmeLOih1RvgeHc9NsOc2226D3Tex7K8dEzyPNc0nCAlBR8LqdvXxgfxubV60aZsBRyzmcYjSYCYIuz5
PAYPAL_MODE=sandbox
JWT_SECRET=your-secret-key
COMMISSION_RATE=0.05
ESCROW_AUTO_RELEASE_HOURS=24
```

3. Start the backend:
```bash
cd backend
npm start
```

4. Start the mobile app:
```bash
npm start
```

## Project Structure

```
PartyConnect/
├── App.js                 # Main app entry point
├── screens/               # All app screens
│   ├── auth/            # Authentication screens
│   ├── discover/        # Party discovery screens
│   ├── party/           # Party management screens
│   ├── profile/         # User profile screens
│   ├── verification/     # ID verification screen
│   ├── messages/        # Messaging screens
│   ├── payment/         # Payment screen
│   └── dev/             # Developer mode screen
├── store/                # Zustand state management
├── services/             # API services
├── backend/              # Node.js backend
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   └── server.js        # Express server
└── assets/              # Images and assets
```

## API Endpoints

### User
- `POST /api/user/create` - Create user profile
- `GET /api/user/me` - Get current user
- `GET /api/user/:id` - Get user by ID
- `POST /api/user/upload-id` - Submit verification
- `PUT /api/user/profile` - Update profile

### Party
- `POST /api/party/create` - Create party (draft)
- `POST /api/party/:id/publish` - Publish party
- `GET /api/party/list` - Get published parties
- `GET /api/party/:id` - Get party details
- `POST /api/party/:id/join` - Join party
- `POST /api/party/:id/confirm-arrival` - Confirm arrival

### Payments
- `POST /api/payments/create-checkout-session` - Create payment
- `POST /api/payments/webhook/stripe` - Stripe webhook
- `POST /api/payments/release-escrow` - Release escrow
- `POST /api/payments/refund` - Refund payment

### Admin
- `GET /api/admin/verifications/pending` - Get pending verifications
- `POST /api/admin/verifications/:userId/approve` - Approve verification
- `POST /api/admin/verifications/:userId/reject` - Reject verification

## Developer Mode

To unlock developer mode:
1. Tap the app logo (🎉) 10 times quickly
2. Enter password: `tomasdievas`

Features:
- Debug console
- Payment test mode (bypass Stripe/PayPal)
- Manual verification override
- API inspector
- Dev logs viewer

## Safety Features

- Manual admin ID verification
- Party addresses hidden until payment
- User blocking system
- Reporting system
- Encrypted data storage
- Escrow payment system

## License

Private - All rights reserved

