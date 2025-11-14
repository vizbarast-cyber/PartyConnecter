# 📱 PartyConnect - Pre-Publish Checklist

Complete this checklist before submitting your app to app stores.

## 🔴 CRITICAL - Must Complete Before Publishing

### 1. Backend Deployment & Configuration

#### Backend Server Setup
- [ ] **Deploy backend to production server** (Heroku, AWS, DigitalOcean, etc.)
  - [ ] Set up hosting account
  - [ ] Deploy backend code
  - [ ] Configure production domain (e.g., `api.partyconnect.com`)
  - [ ] Set up SSL certificate (HTTPS required)
  - [ ] Configure environment variables on production server

#### Backend Environment Variables (Production)
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI` - MongoDB Atlas connection string (production database)
- [ ] `FIREBASE_PROJECT_ID=party-connect-q8z7m3` ✅ Already set
- [ ] `FIREBASE_PRIVATE_KEY` - Production Firebase Admin SDK key
- [ ] `FIREBASE_CLIENT_EMAIL` - Firebase service account email
- [ ] `STRIPE_SECRET_KEY` - **LIVE** Stripe secret key (switch from test to live)
- [ ] `STRIPE_PUBLISHABLE_KEY` - **LIVE** Stripe publishable key
- [ ] `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret for production
- [ ] `PAYPAL_CLIENT_ID` - **LIVE** PayPal client ID (switch from sandbox)
- [ ] `PAYPAL_SECRET` - **LIVE** PayPal secret
- [ ] `PAYPAL_MODE=live` - Change from `sandbox` to `live`
- [ ] `JWT_SECRET` - Strong random secret (generate with `npm run generate:jwt`)
- [ ] `ALLOWED_ORIGINS` - Your production domain(s)
- [ ] `COMMISSION_RATE=0.05` ✅ Already set
- [ ] `ESCROW_AUTO_RELEASE_HOURS=24` ✅ Already set

#### Database Setup
- [ ] **MongoDB Atlas** (recommended for production)
  - [ ] Create MongoDB Atlas account
  - [ ] Create production cluster
  - [ ] Set up database user
  - [ ] Configure network access (whitelist production server IP)
  - [ ] Get connection string and add to `backend/.env`
  - [ ] Run database indexes: `cd backend && npm run setup-indexes`

### 2. Mobile App Configuration

#### API Configuration
- [ ] **Update production API URL** in `services/api.js`
  - Change `'https://api.yourdomain.com/api'` to your actual production API URL
  - Example: `'https://api.partyconnect.com/api'`

#### App Configuration
- [ ] **Update `app.config.js`**:
  - [ ] Change `bundleIdentifier` from `"com.mycompany.partyconnect"` to your actual bundle ID
  - [ ] Change `package` (Android) from `"com.mycompany.partyconnect"` to your actual package name
  - [ ] Update `version` if needed (currently `"1.0.0"`)
  - [ ] Update `buildNumber` (iOS) and `versionCode` (Android) for each release

#### Environment Variables (Mobile)
- [ ] **Create `.env` file** (already created ✅)
  - [ ] `EXPO_PUBLIC_GOOGLE_CLIENT_ID` - Web Client ID ✅ Already set
  - [ ] `EXPO_PUBLIC_API_URL` - Production API URL (optional, can use app.config.js)

### 3. Firebase Configuration

#### Firebase Console Setup
- [ ] **Enable Authentication**:
  - [ ] Email/Password authentication enabled
  - [ ] Google Sign-In enabled ✅ Already configured
  - [ ] Configure authorized domains

- [ ] **Firestore Database**:
  - [ ] Create Firestore database in production mode
  - [ ] Deploy security rules: `npm run deploy:firebase-rules`
  - [ ] Test rules with Firebase emulator

- [ ] **Storage**:
  - [ ] Create Storage bucket
  - [ ] Deploy storage security rules
  - [ ] Configure CORS if needed

- [ ] **Firebase Configuration Files**:
  - [ ] `GoogleService-Info.plist` (iOS) ✅ File exists
  - [ ] `google-services.json` (Android) ✅ File exists
  - [ ] Verify these are the **production** Firebase project files

### 4. App Store Requirements

#### App Store Connect (iOS)
- [ ] **Apple Developer Account** ($99/year)
  - [ ] Enroll in Apple Developer Program
  - [ ] Create App ID in Apple Developer Portal
  - [ ] Configure App Store Connect app listing

- [ ] **App Information**:
  - [ ] App name: "PartyConnect"
  - [ ] Subtitle
  - [ ] Category
  - [ ] Privacy policy URL (required)
  - [ ] Terms of service URL (required)
  - [ ] Support URL
  - [ ] Marketing URL (optional)

- [ ] **App Icons & Screenshots**:
  - [ ] App icon (1024x1024px) ✅ Exists
  - [ ] Screenshots for different device sizes (iPhone, iPad)
  - [ ] App preview video (optional)

- [ ] **App Store Metadata**:
  - [ ] Description
  - [ ] Keywords
  - [ ] Promotional text
  - [ ] Age rating (complete questionnaire)

- [ ] **Update `eas.json`**:
  - [ ] Replace `"your-apple-id@example.com"` with your Apple ID
  - [ ] Replace `"your-app-store-connect-app-id"` with your App Store Connect App ID
  - [ ] Replace `"your-team-id"` with your Apple Team ID

#### Google Play Console (Android)
- [ ] **Google Play Developer Account** ($25 one-time)
  - [ ] Create Google Play Developer account
  - [ ] Pay one-time registration fee

- [ ] **App Information**:
  - [ ] App name: "PartyConnect"
  - [ ] Short description
  - [ ] Full description
  - [ ] Category
  - [ ] Privacy policy URL (required)
  - [ ] Terms of service URL (required)

- [ ] **App Icons & Graphics**:
  - [ ] App icon (512x512px) ✅ Exists
  - [ ] Feature graphic (1024x500px)
  - [ ] Screenshots (phone, tablet, TV)
  - [ ] Promotional video (optional)

- [ ] **Content Rating**:
  - [ ] Complete content rating questionnaire
  - [ ] Submit for rating

- [ ] **Update `eas.json`**:
  - [ ] Ensure `google-service-account.json` exists for automated submission
  - [ ] Configure service account in Google Play Console

### 5. Legal & Compliance

#### Privacy & Terms
- [ ] **Privacy Policy** (REQUIRED by both stores)
  - [ ] Create privacy policy document
  - [ ] Host on your website
  - [ ] Update URL in app (check `config/legal.js` if it exists)
  - [ ] Include:
    - Data collection practices
    - Third-party services (Firebase, Stripe, PayPal)
    - User rights (GDPR compliance if applicable)
    - Contact information

- [ ] **Terms of Service**
  - [ ] Create terms of service document
  - [ ] Host on your website
  - [ ] Update URL in app
  - [ ] Include:
    - User responsibilities
    - Payment terms
    - Refund policy
    - Liability limitations

- [ ] **GDPR Compliance** (if serving EU users)
  - [ ] Privacy policy includes GDPR rights
  - [ ] Cookie consent (if web version)
  - [ ] Data export functionality
  - [ ] Data deletion functionality

#### Payment Compliance
- [ ] **Stripe**:
  - [ ] Switch from test mode to live mode
  - [ ] Configure webhook endpoint for production
  - [ ] Test payment flow in production
  - [ ] Set up refund policy

- [ ] **PayPal**:
  - [ ] Switch from sandbox to live mode
  - [ ] Configure webhook endpoint for production
  - [ ] Test payment flow in production

### 6. Security & Testing

#### Security
- [ ] **Backend Security**:
  - [ ] All environment variables set (no defaults in production)
  - [ ] Rate limiting configured
  - [ ] CORS configured for production domains only
  - [ ] Helmet.js security headers enabled ✅ Already configured
  - [ ] Input validation on all endpoints ✅ Already configured
  - [ ] Firebase security rules deployed ✅ Script exists

- [ ] **Mobile App Security**:
  - [ ] No API keys hardcoded ✅ Already configured
  - [ ] Production API URL configured
  - [ ] Firebase config files are for production project

#### Testing
- [ ] **Functional Testing**:
  - [ ] Test user registration (email & Google)
  - [ ] Test profile creation and editing
  - [ ] Test party creation (organizer flow)
  - [ ] Test party discovery and swiping (attendee flow)
  - [ ] Test request/acceptance flow
  - [ ] Test payment flow (Stripe & PayPal)
  - [ ] Test ID verification upload
  - [ ] Test messaging (if implemented)
  - [ ] Test notifications (if implemented)

- [ ] **Device Testing**:
  - [ ] Test on iOS devices (multiple versions)
  - [ ] Test on Android devices (multiple versions)
  - [ ] Test on different screen sizes
  - [ ] Test offline scenarios
  - [ ] Test with slow network connections

- [ ] **Payment Testing**:
  - [ ] Test with real payment methods (small amounts)
  - [ ] Test refund process
  - [ ] Test escrow release
  - [ ] Verify webhook handling

### 7. Assets & Branding

#### App Icons & Splash Screens
- [ ] **App Icon**:
  - [ ] iOS: 1024x1024px ✅ Exists (`assets/icon.png`)
  - [ ] Android: 512x512px ✅ Exists (`assets/adaptive-icon.png`)
  - [ ] Verify icons look good on devices

- [ ] **Splash Screen**:
  - [ ] iOS splash screen ✅ Exists (`assets/splash.png`)
  - [ ] Android splash screen ✅ Exists
  - [ ] Verify splash screen displays correctly

#### App Store Assets
- [ ] **Screenshots** (required):
  - [ ] iOS: iPhone screenshots (6.5" and 5.5" displays)
  - [ ] iOS: iPad screenshots (if supporting iPad)
  - [ ] Android: Phone screenshots (multiple sizes)
  - [ ] Android: Tablet screenshots (if supporting tablets)

- [ ] **Marketing Materials**:
  - [ ] App preview video (optional but recommended)
  - [ ] Feature graphic (Android)
  - [ ] Promotional images

### 8. Build & Submit

#### Pre-Build Checklist
- [ ] **Git Configuration**:
  - [ ] Git repository initialized ✅ Done
  - [ ] All code committed
  - [ ] `.env` files in `.gitignore` ✅ Already configured
  - [ ] No sensitive data in repository

- [ ] **EAS Build Configuration**:
  - [ ] `eas.json` configured ✅ Exists
  - [ ] Production build profile configured
  - [ ] iOS credentials configured
  - [ ] Android credentials configured

#### Build Process
- [ ] **Test Build**:
  - [ ] Build preview version: `npm run build:android -- --profile preview`
  - [ ] Test preview build on device
  - [ ] Fix any issues found

- [ ] **Production Build**:
  - [ ] Build Android: `npm run build:android -- --profile production`
  - [ ] Build iOS: `npm run build:ios -- --profile production`
  - [ ] Verify builds complete successfully

#### Submit to Stores
- [ ] **Google Play**:
  - [ ] Upload AAB file
  - [ ] Complete store listing
  - [ ] Set pricing (free/paid)
  - [ ] Submit for review

- [ ] **App Store**:
  - [ ] Upload IPA file
  - [ ] Complete App Store Connect listing
  - [ ] Submit for review

### 9. Post-Launch

#### Monitoring
- [ ] **Error Tracking**:
  - [ ] Set up error monitoring (Sentry, Bugsnag, etc.)
  - [ ] Configure alerts for critical errors

- [ ] **Analytics**:
  - [ ] Set up analytics (Firebase Analytics, Mixpanel, etc.)
  - [ ] Track key user actions
  - [ ] Monitor app performance

- [ ] **Backend Monitoring**:
  - [ ] Set up server monitoring
  - [ ] Configure uptime monitoring
  - [ ] Set up log aggregation

#### Support
- [ ] **Support System**:
  - [ ] Set up support email/chat
  - [ ] Create FAQ page
  - [ ] Prepare support documentation

- [ ] **Backup & Recovery**:
  - [ ] Set up MongoDB automated backups
  - [ ] Test backup restoration
  - [ ] Document recovery procedures

## 📝 Quick Reference

### Current Status
- ✅ Google Sign-In configured
- ✅ Firebase project configured
- ✅ App icons exist
- ✅ EAS build configured
- ✅ Security middleware configured
- ✅ Payment providers configured (need to switch to live mode)

### Critical URLs to Update
1. **API URL**: `services/api.js` line 14
2. **Privacy Policy**: Check if `config/legal.js` exists, or add to app
3. **Terms of Service**: Check if `config/legal.js` exists, or add to app

### Commands to Run
```bash
# Generate secure JWT secret
npm run generate:jwt

# Deploy Firebase security rules
npm run deploy:firebase-rules

# Set up database indexes
cd backend && npm run setup-indexes

# Build for production
npm run build:android -- --profile production
npm run build:ios -- --profile production
```

## 🎯 Priority Order

1. **Backend Deployment** (Critical - app won't work without it)
2. **Update API URL** (Critical - app won't connect to backend)
3. **Switch Payment to Live Mode** (Critical - payments won't work)
4. **Privacy Policy & Terms** (Required by stores)
5. **App Store Listings** (Required to publish)
6. **Testing** (Critical - ensure app works)
7. **Build & Submit** (Final step)

---

**Estimated Time to Complete**: 2-4 weeks (depending on app store review times)

**Note**: App store reviews typically take 1-3 days for Google Play and 1-7 days for App Store.

