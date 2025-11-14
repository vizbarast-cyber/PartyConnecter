# 🔐 User Verification Guide

This guide explains how to verify users who have submitted their identity verification documents.

## 📋 How Verification Works

1. **User Submits Verification**:
   - User takes photo of government ID
   - User takes selfie
   - User enters birth date
   - Submission is saved with status: `pending`

2. **Admin Reviews**:
   - Admin views pending verifications
   - Admin reviews ID photo and selfie
   - Admin approves or rejects

3. **User Status Updated**:
   - If approved: User can create/join parties
   - If rejected: User sees rejection reason and can resubmit

## 🛠️ Methods to Verify Users

### Method 1: Using API Endpoints (Recommended for Production)

#### Get Pending Verifications

```bash
GET /api/admin/verifications/pending
Authorization: Bearer <your-firebase-token>
```

**Response:**
```json
{
  "users": [
    {
      "userId": "firebase-user-id",
      "email": "user@example.com",
      "verification": {
        "status": "pending",
        "idPhotoUrl": "https://...",
        "selfieUrl": "https://...",
        "birthDate": "2000-01-01T00:00:00.000Z",
        "age": 24,
        "submittedAt": "2024-01-15T10:30:00.000Z"
      },
      "profile": {
        "name": "John Doe"
      }
    }
  ]
}
```

#### Approve Verification

```bash
POST /api/admin/verifications/:userId/approve
Authorization: Bearer <your-firebase-token>
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/admin/verifications/firebase-user-id-here/approve \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -H "Content-Type: application/json"
```

**Response:**
```json
{
  "message": "Verification approved",
  "user": { ... }
}
```

#### Reject Verification

```bash
POST /api/admin/verifications/:userId/reject
Authorization: Bearer <your-firebase-token>
Content-Type: application/json

{
  "reason": "ID photo is unclear"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/admin/verifications/firebase-user-id-here/reject \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"reason": "ID photo is unclear. Please resubmit with a clearer photo."}'
```

### Method 2: Using MongoDB Directly

If you have MongoDB access:

```javascript
// Connect to MongoDB
use partyconnect

// Find pending verifications
db.users.find({ "verification.status": "pending" })

// Approve a user
db.users.updateOne(
  { userId: "firebase-user-id-here" },
  { 
    $set: { 
      "verification.status": "approved",
      "verification.reviewedAt": new Date(),
      "verification.reviewedBy": "admin-user-id"
    }
  }
)

// Reject a user
db.users.updateOne(
  { userId: "firebase-user-id-here" },
  { 
    $set: { 
      "verification.status": "rejected",
      "verification.reviewedAt": new Date(),
      "verification.reviewedBy": "admin-user-id",
      "verification.rejectionReason": "ID photo is unclear"
    }
  }
)
```

### Method 3: Using Admin Screen (In App)

The app includes a Dev Mode screen that can be used for verification. However, for production, you should create a proper admin interface.

## 🔒 Admin Authentication

**Current Status**: The admin endpoints currently allow any authenticated user (for development).

**For Production**, you should:

1. **Add Admin Flag to User Model**:
   ```javascript
   // In backend/models/User.js
   isAdmin: {
     type: Boolean,
     default: false,
   }
   ```

2. **Update Admin Middleware**:
   ```javascript
   // In backend/routes/admin.js
   const requireAdmin = async (req, res, next) => {
     const user = await User.findOne({ userId: req.user.uid });
     
     if (!user || !user.isAdmin) {
       return res.status(403).json({ error: 'Admin access required' });
     }
     
     next();
   };
   ```

3. **Set Admin Flag**:
   ```javascript
   // In MongoDB or via API
   db.users.updateOne(
     { email: "admin@yourdomain.com" },
     { $set: { isAdmin: true } }
   )
   ```

## 📱 Quick Verification Script

Create a simple Node.js script to verify users:

```javascript
// scripts/verify-user.js
const axios = require('axios');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

async function verifyUser(userId, action = 'approve', reason = '') {
  try {
    // Get admin token
    const adminUser = await admin.auth().getUserByEmail('admin@yourdomain.com');
    const customToken = await admin.auth().createCustomToken(adminUser.uid);
    
    // Get ID token (you'll need to sign in with this custom token)
    // For now, use your Firebase token directly
    
    const apiUrl = process.env.API_URL || 'http://localhost:3000/api';
    
    if (action === 'approve') {
      const response = await axios.post(
        `${apiUrl}/admin/verifications/${userId}/approve`,
        {},
        {
          headers: {
            'Authorization': `Bearer YOUR_FIREBASE_TOKEN_HERE`,
          },
        }
      );
      console.log('✅ User approved:', response.data);
    } else {
      const response = await axios.post(
        `${apiUrl}/admin/verifications/${userId}/reject`,
        { reason },
        {
          headers: {
            'Authorization': `Bearer YOUR_FIREBASE_TOKEN_HERE`,
          },
        }
      );
      console.log('❌ User rejected:', response.data);
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Usage: node scripts/verify-user.js <userId> <approve|reject> [reason]
const [,, userId, action, reason] = process.argv;
verifyUser(userId, action, reason);
```

## 🎯 Step-by-Step Verification Process

1. **Check for Pending Verifications**:
   ```bash
   # Using curl
   curl http://localhost:3000/api/admin/verifications/pending \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

2. **Review the Verification**:
   - Check the `idPhotoUrl` - ensure ID is clear and valid
   - Check the `selfieUrl` - ensure it matches the ID photo
   - Verify the age is 18+

3. **Approve or Reject**:
   ```bash
   # Approve
   curl -X POST http://localhost:3000/api/admin/verifications/USER_ID/approve \
     -H "Authorization: Bearer YOUR_TOKEN"
   
   # Reject with reason
   curl -X POST http://localhost:3000/api/admin/verifications/USER_ID/reject \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"reason": "ID photo is unclear"}'
   ```

## 🔍 Viewing Verification Images

The verification images are stored as URLs in the user document. You can:

1. **View in Browser**: Open the `idPhotoUrl` and `selfieUrl` directly
2. **Download**: Use curl or wget to download images
3. **Create Admin UI**: Build a simple web interface to view images

## ⚠️ Important Notes

- **Security**: Currently, any authenticated user can verify others. Fix this before production!
- **Image Storage**: Images should be stored securely (Firebase Storage recommended)
- **Privacy**: Verification images contain sensitive data - handle with care
- **Audit Trail**: All verifications are logged with `reviewedAt` and `reviewedBy`

## 🚀 Production Recommendations

1. **Create Admin Dashboard**: Build a web interface for verification management
2. **Implement Proper Admin Auth**: Use Firebase Custom Claims or admin flags
3. **Add Image Viewing**: Create secure endpoints to view verification images
4. **Add Notifications**: Notify users when verification is approved/rejected
5. **Add Analytics**: Track verification approval rates and common rejection reasons

---

**Need Help?** Check the API documentation or contact support.

