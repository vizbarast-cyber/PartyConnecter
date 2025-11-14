# PartyConnect Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
# Root directory
npm install

# Backend
cd backend
npm install
cd ..
```

### 2. Firebase Setup

**📖 See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed step-by-step instructions**

Quick steps:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **party-connect-q8z7m3**
3. Download Firebase Admin SDK credentials:
   - Project Settings → Service Accounts → Generate new private key
   - Extract `project_id`, `private_key`, and `client_email` from the JSON file
4. Add to `backend/.env`:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY` (full key with `\n` characters)
   - `FIREBASE_CLIENT_EMAIL`
5. Enable services in Firebase Console:
   - Authentication (Email/Password, Google)
   - Firestore Database
   - Cloud Storage
   - Cloud Messaging

### 3. MongoDB Setup

Install MongoDB locally or use MongoDB Atlas (cloud).

Update `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/partyconnect
```

### 4. Environment Variables

Create `backend/.env` file with all required variables (see `.env.example`).

### 5. Start Services

Terminal 1 - Backend:
```bash
cd backend
npm start
```

Terminal 2 - Mobile App:
```bash
npm start
```

### 6. Run on Device

- iOS: Press `i` in Expo CLI or scan QR code with Camera app
- Android: Press `a` in Expo CLI or scan QR code with Expo Go app

## Important Notes

1. **Google Sign-In**: Currently uses placeholder. For production, implement with `expo-auth-session` or Firebase Web SDK.

2. **Image Upload**: Currently returns placeholder URLs. Implement Firebase Storage upload in:
   - `screens/party/CreatePartyScreen.js`
   - `screens/profile/EditProfileScreen.js`
   - `screens/verification/VerificationScreen.js`

3. **Payments**: Stripe and PayPal integration is set up but may need webhook configuration for production.

4. **Real-time Messaging**: Currently uses placeholder. Implement with Firebase Firestore real-time listeners.

5. **Notifications**: Set up Firebase Cloud Messaging for push notifications.

## Developer Mode

To unlock:
1. Tap the 🎉 logo 10 times quickly
2. Enter password: `tomasdievas`

## Testing

- Use dev mode to bypass payments during testing
- Create test users with different roles
- Test verification flow with admin dashboard

