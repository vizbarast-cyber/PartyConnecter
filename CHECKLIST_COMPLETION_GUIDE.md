# Checklist Completion Guide

This guide helps you complete all the production checklist items.

## 🔐 Backend Security

### ✅ Automated (Already Done)
- [x] All `.env` files excluded from Git (in `.gitignore`)
- [x] CORS configured for specific origins only
- [x] Rate limiting enabled and configured
- [x] Helmet.js security headers enabled
- [x] Input validation on all API endpoints
- [x] SQL injection prevention (using Mongoose)
- [x] XSS prevention (Helmet.js)
- [x] Error handling middleware

### 🔧 Manual Steps Required

#### 1. Generate Strong JWT Secret
```bash
npm run generate:jwt
```
Copy the output and add to `backend/.env`:
```
JWT_SECRET=your-generated-secret-here
```

#### 2. Verify Firebase Private Key Format
Your `FIREBASE_PRIVATE_KEY` in `backend/.env` should have `\n` characters:
```
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

#### 3. Configure HTTPS
- **Heroku**: Automatic HTTPS
- **AWS/DigitalOcean**: Use Let's Encrypt or Cloudflare
- **Railway/Render**: Automatic HTTPS

#### 4. Deploy Firebase Security Rules
```bash
npm run deploy:firebase-rules
```
Or manually:
```bash
firebase login
firebase deploy --only firestore:rules,storage
```

#### 5. Rotate API Keys
- Generate new Stripe keys if needed
- Generate new PayPal keys if needed
- Update in `backend/.env`

#### 6. Configure Webhook Secrets
- **Stripe**: Get from Dashboard → Developers → Webhooks
- Add to `backend/.env`: `STRIPE_WEBHOOK_SECRET=whsec_...`
- **PayPal**: Configure in PayPal Developer Dashboard

## 📱 Mobile App Security

### ✅ Automated (Already Done)
- [x] API keys not hardcoded (using environment variables)
- [x] Production API URL configuration structure
- [x] Firebase config files structure

### 🔧 Manual Steps Required

#### 1. Update Production API URL
Edit `services/api.js`:
```javascript
: 'https://api.yourdomain.com/api'; // Change to your actual domain
```

#### 2. Update Firebase Config Files
- Ensure `google-services.json` (Android) is up to date
- Ensure `GoogleService-Info.plist` (iOS) is up to date

#### 3. Add Privacy Policy & Terms URLs
Edit `config/legal.js`:
```javascript
privacyPolicy: 'https://yourdomain.com/privacy-policy',
termsOfService: 'https://yourdomain.com/terms-of-service',
```

#### 4. Sensitive Data Encryption
- Already handled by Firebase Auth
- Consider adding encryption for stored sensitive data if needed

## 🗄️ Database

### 🔧 Manual Steps Required

#### 1. Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `backend/.env`: `MONGODB_URI=mongodb+srv://...`

#### 2. Configure Database Backups
- **Atlas**: Automatic backups enabled by default
- **Local**: Set up cron job or use MongoDB backup tools

#### 3. Create Database Indexes
```bash
npm run setup:production
# Then run:
cd backend
npm run setup-indexes
```

#### 4. Restrict Database Access by IP
- In MongoDB Atlas: Network Access → Add IP Address
- Add your server IPs only

## 🔥 Firebase

### ✅ Automated (Already Done)
- [x] Security rules created
- [x] Service account key structure

### 🔧 Manual Steps Required

#### 1. Enable Firebase Services
In [Firebase Console](https://console.firebase.google.com/):

1. **Authentication**
   - Go to Authentication → Sign-in method
   - Enable Email/Password
   - Enable Google (add OAuth client IDs)

2. **Firestore Database**
   - Go to Firestore Database
   - Create database (Start in production mode)
   - Deploy security rules: `npm run deploy:firebase-rules`

3. **Storage**
   - Go to Storage
   - Get started
   - Deploy security rules: `npm run deploy:firebase-rules`

4. **Cloud Messaging**
   - Already enabled by default
   - Configure for push notifications

#### 2. Download Service Account Key
- Already done (you have the JSON file)
- Ensure it's in `backend/.env` as `FIREBASE_PRIVATE_KEY` and `FIREBASE_CLIENT_EMAIL`

#### 3. Secure API Keys
- Don't commit Firebase config files with sensitive keys
- Use environment variables where possible

## 💳 Payments

### Stripe

#### 1. Verify Account
- Complete Stripe account verification
- Add business information

#### 2. Configure Live API Keys
Update `backend/.env`:
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

#### 3. Set Up Webhook Endpoint
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-api.com/api/payments/webhook/stripe`
3. Select events: `checkout.session.completed`
4. Copy webhook secret
5. Add to `backend/.env`: `STRIPE_WEBHOOK_SECRET=whsec_...`

#### 4. Test Payments
- Use Stripe test cards first
- Test complete payment flow
- Test refund process

### PayPal

#### 1. Verify Business Account
- Complete PayPal business account verification
- Add business information

#### 2. Configure Live Credentials
Update `backend/.env`:
```
PAYPAL_CLIENT_ID=your-live-client-id
PAYPAL_SECRET=your-live-secret
PAYPAL_MODE=live
```

#### 3. Set Up Webhook Endpoint
1. Go to PayPal Developer Dashboard
2. Add webhook URL: `https://your-api.com/api/payments/webhook/paypal`
3. Select events: `PAYMENT.SALE.COMPLETED`
4. Save webhook ID

#### 4. Test Payments
- Use PayPal sandbox first
- Test complete payment flow
- Test refund process

## 🚀 Quick Setup Commands

Run these commands in order:

```bash
# 1. Generate JWT Secret
npm run generate:jwt
# Copy output to backend/.env

# 2. Verify security configuration
cd backend
npm run verify-security

# 3. Create database indexes
npm run setup-indexes

# 4. Deploy Firebase rules
npm run deploy:firebase-rules

# 5. Run complete setup check
npm run setup:production
```

## ✅ Verification

After completing all steps, verify everything:

```bash
# Check security
cd backend
npm run verify-security

# Test backend
npm start
# Should see: "Firebase Admin initialized" and "MongoDB connected"

# Check health endpoint
curl http://localhost:3000/api/health
```

## 📝 Notes

- **Never commit** `.env` files or service account keys
- **Always test** in staging before production
- **Monitor** error logs after deployment
- **Backup** database regularly
- **Update** dependencies regularly for security

## 🆘 Troubleshooting

### Firebase Rules Not Deploying
```bash
firebase login
firebase use your-project-id
firebase deploy --only firestore:rules,storage
```

### Database Connection Issues
- Check MongoDB Atlas network access
- Verify connection string format
- Check IP whitelist

### Payment Webhooks Not Working
- Verify webhook URL is accessible
- Check webhook secret matches
- Test with Stripe/PayPal webhook testing tools

