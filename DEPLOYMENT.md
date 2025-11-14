# PartyConnect - Production Deployment Guide

This guide covers deploying PartyConnect to production environments.

## 📋 Pre-Deployment Checklist

### Backend
- [ ] All environment variables set in production
- [ ] MongoDB database configured (Atlas recommended)
- [ ] Firebase Admin SDK credentials configured
- [ ] Stripe webhook endpoint configured
- [ ] PayPal webhook endpoint configured
- [ ] SSL certificate installed
- [ ] Domain name configured
- [ ] Rate limiting configured
- [ ] Logging set up
- [ ] Error monitoring configured (e.g., Sentry)

### Mobile App
- [ ] App icons and splash screens created
- [ ] Bundle identifiers configured
- [ ] App Store Connect / Google Play Console accounts set up
- [ ] Privacy policy URL configured
- [ ] Terms of service URL configured
- [ ] API endpoint updated to production URL
- [ ] Firebase configuration files updated
- [ ] Push notifications configured

## 🚀 Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create partyconnect-api
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set FIREBASE_PROJECT_ID=party-connect-q8z7m3
   heroku config:set FIREBASE_PRIVATE_KEY="your-private-key"
   heroku config:set FIREBASE_CLIENT_EMAIL=your-client-email
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set STRIPE_SECRET_KEY=your-stripe-key
   heroku config:set PAYPAL_CLIENT_ID=your-paypal-id
   heroku config:set PAYPAL_SECRET=your-paypal-secret
   heroku config:set JWT_SECRET=your-secure-jwt-secret
   heroku config:set ALLOWED_ORIGINS=https://your-app.com,https://www.your-app.com
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 2: AWS EC2 / DigitalOcean

1. **Set up server**
   - Ubuntu 20.04+ recommended
   - Install Node.js 18+
   - Install PM2: `npm install -g pm2`

2. **Clone and configure**
   ```bash
   git clone your-repo
   cd backend
   npm install --production
   cp .env.example .env
   # Edit .env with production values
   ```

3. **Start with PM2**
   ```bash
   pm2 start server.js --name partyconnect-api
   pm2 save
   pm2 startup
   ```

4. **Set up Nginx reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Install SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.yourdomain.com
   ```

### Option 3: Railway / Render

1. **Connect repository** to Railway/Render
2. **Set environment variables** in dashboard
3. **Deploy** automatically on push

## 📱 Mobile App Deployment

### iOS (App Store)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   eas login
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Create app.json build config**
   - Update bundle identifier
   - Add app icons
   - Configure permissions

4. **Build for iOS**
   ```bash
   eas build --platform ios --profile production
   ```

5. **Submit to App Store**
   ```bash
   eas submit --platform ios
   ```

### Android (Google Play)

1. **Build for Android**
   ```bash
   eas build --platform android --profile production
   ```

2. **Submit to Google Play**
   ```bash
   eas submit --platform android
   ```

## 🔒 Security Checklist

### Backend
- [ ] Environment variables secured (never in code)
- [ ] HTTPS enabled
- [ ] CORS configured for specific origins
- [ ] Rate limiting enabled
- [ ] Helmet.js security headers configured
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS prevention
- [ ] Authentication required for sensitive endpoints
- [ ] Firebase security rules deployed

### Mobile App
- [ ] API keys not hardcoded
- [ ] Sensitive data encrypted
- [ ] Certificate pinning (optional)
- [ ] Obfuscation enabled for production builds
- [ ] Privacy policy and terms of service links

## 📊 Monitoring & Logging

### Recommended Services

1. **Error Tracking**: Sentry
   ```bash
   npm install @sentry/react-native
   ```

2. **Analytics**: Firebase Analytics or Mixpanel

3. **Performance**: Firebase Performance Monitoring

4. **Logging**: Winston or Morgan (already included)

### Set Up Sentry

1. **Install**
   ```bash
   npm install @sentry/react-native
   ```

2. **Configure in App.js**
   ```javascript
   import * as Sentry from '@sentry/react-native';
   
   Sentry.init({
     dsn: 'your-sentry-dsn',
     environment: __DEV__ ? 'development' : 'production',
   });
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm install
      - run: cd backend && npm test
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "partyconnect-api"
          heroku_email: "your-email@example.com"
```

## 📝 Environment Variables for Production

### Backend (.env)
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://...
FIREBASE_PROJECT_ID=party-connect-q8z7m3
FIREBASE_PRIVATE_KEY="..."
FIREBASE_CLIENT_EMAIL=...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
PAYPAL_CLIENT_ID=...
PAYPAL_SECRET=...
PAYPAL_MODE=live
JWT_SECRET=very-secure-random-string
COMMISSION_RATE=0.05
ESCROW_AUTO_RELEASE_HOURS=24
ALLOWED_ORIGINS=https://your-app.com,https://www.your-app.com
```

### Mobile App (app.config.js)
```javascript
export default {
  expo: {
    extra: {
      apiUrl: __DEV__ 
        ? 'http://localhost:3000/api'
        : 'https://api.yourdomain.com/api',
    },
  },
};
```

## 🧪 Testing Before Launch

1. **Load Testing**
   - Use Apache Bench or k6
   - Test with expected user load

2. **Security Testing**
   - Run OWASP ZAP
   - Check for common vulnerabilities

3. **Mobile Testing**
   - Test on real devices
   - Test on different OS versions
   - Test offline scenarios

## 📈 Post-Deployment

1. **Monitor**
   - Check error logs daily
   - Monitor API response times
   - Track user metrics

2. **Backup**
   - Set up MongoDB automated backups
   - Backup Firebase data regularly

3. **Updates**
   - Plan regular security updates
   - Monitor dependency vulnerabilities
   - Update Node.js and packages regularly

## 🆘 Troubleshooting

### Common Issues

**Backend won't start**
- Check environment variables
- Verify MongoDB connection
- Check Firebase credentials

**Mobile app crashes**
- Check API endpoint URL
- Verify Firebase configuration
- Check for missing permissions

**Payments not working**
- Verify webhook endpoints
- Check Stripe/PayPal credentials
- Verify SSL certificate

## 📞 Support

For deployment issues, check:
- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Heroku Documentation](https://devcenter.heroku.com/)

