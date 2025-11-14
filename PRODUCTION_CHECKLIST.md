# Production Deployment Checklist

Use this checklist before deploying to production.

## 🔐 Security

### Backend
- [ ] All `.env` files excluded from Git
- [ ] Strong `JWT_SECRET` generated (32+ random characters)
- [ ] `FIREBASE_PRIVATE_KEY` properly formatted with `\n`
- [ ] CORS configured for specific origins only
- [ ] Rate limiting enabled and configured
- [ ] Helmet.js security headers enabled
- [ ] Input validation on all API endpoints
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS prevention
- [ ] HTTPS enabled
- [ ] Firebase security rules deployed
- [ ] API keys rotated and secured
- [ ] Webhook secrets configured

### Mobile App
- [ ] API keys not hardcoded in source code
- [ ] Production API URL configured
- [ ] Firebase config files updated
- [ ] Sensitive data encrypted
- [ ] Privacy policy URL added
- [ ] Terms of service URL added

## 🗄️ Database

- [ ] MongoDB Atlas cluster created (or local MongoDB secured)
- [ ] Database backups configured
- [ ] Connection string secured
- [ ] Indexes created for performance
- [ ] Database access restricted by IP (if using Atlas)

## 🔥 Firebase

- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password, Google)
- [ ] Firestore database created
- [ ] Storage bucket created
- [ ] Security rules deployed:
  - [ ] Firestore rules
  - [ ] Storage rules
- [ ] Cloud Messaging configured
- [ ] Service account key downloaded
- [ ] API keys secured

## 💳 Payments

### Stripe
- [ ] Stripe account verified
- [ ] Live API keys configured
- [ ] Webhook endpoint configured
- [ ] Webhook secret set in environment
- [ ] Test payments completed
- [ ] Refund process tested

### PayPal
- [ ] PayPal business account verified
- [ ] Live credentials configured
- [ ] Webhook endpoint configured
- [ ] Test payments completed
- [ ] Refund process tested

## 📱 Mobile App

### iOS
- [ ] App icons created (1024x1024)
- [ ] Splash screen created
- [ ] Bundle identifier configured
- [ ] App Store Connect account set up
- [ ] Privacy policy URL configured
- [ ] Terms of service URL configured
- [ ] App Store listing prepared
- [ ] TestFlight testing completed
- [ ] Production build created

### Android
- [ ] App icons created (512x512)
- [ ] Adaptive icon created
- [ ] Package name configured
- [ ] Google Play Console account set up
- [ ] Privacy policy URL configured
- [ ] Terms of service URL configured
- [ ] Play Store listing prepared
- [ ] Internal testing completed
- [ ] Production build created

## 🚀 Deployment

### Backend
- [ ] Server provisioned (Heroku, AWS, DigitalOcean, etc.)
- [ ] Environment variables set
- [ ] Domain name configured
- [ ] SSL certificate installed
- [ ] Health check endpoint working
- [ ] Logging configured
- [ ] Error monitoring set up (Sentry)
- [ ] PM2 or process manager configured
- [ ] Auto-restart on crash enabled

### Mobile App
- [ ] EAS Build configured
- [ ] Production builds tested
- [ ] App Store submission ready
- [ ] Google Play submission ready

## 🧪 Testing

- [ ] All API endpoints tested
- [ ] Authentication flow tested
- [ ] Payment flow tested (with test cards)
- [ ] Image upload tested
- [ ] Push notifications tested
- [ ] Offline scenarios tested
- [ ] Error handling tested
- [ ] Load testing completed
- [ ] Security testing completed

## 📊 Monitoring

- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured (Firebase Analytics)
- [ ] Performance monitoring enabled
- [ ] Log aggregation set up
- [ ] Uptime monitoring configured
- [ ] Alert system configured

## 📝 Documentation

- [ ] API documentation updated
- [ ] Deployment guide created
- [ ] Environment variables documented
- [ ] Runbook created for common issues
- [ ] Support contact information added

## 🔄 CI/CD

- [ ] GitHub Actions / CI pipeline configured
- [ ] Automated tests in CI
- [ ] Automated deployment configured
- [ ] Rollback plan documented

## ✅ Final Checks

- [ ] All environment variables verified
- [ ] All API endpoints responding
- [ ] Database connections stable
- [ ] Payment processing working
- [ ] Mobile app builds successfully
- [ ] No console errors in production
- [ ] Performance acceptable
- [ ] Security audit completed

## 🎯 Launch Day

- [ ] Backend deployed and verified
- [ ] Mobile apps submitted to stores
- [ ] Monitoring dashboards ready
- [ ] Support team briefed
- [ ] Rollback plan ready
- [ ] Communication plan ready

---

**Remember**: Test everything in a staging environment first!

