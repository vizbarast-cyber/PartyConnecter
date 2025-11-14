# ✅ Backend Deployment Checklist

Use this checklist to ensure everything is set up correctly.

## 📋 Pre-Deployment

- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created and running
- [ ] MongoDB connection string obtained
- [ ] MongoDB network access configured (allow 0.0.0.0/0 for production)
- [ ] Firebase Admin SDK credentials obtained
- [ ] Stripe LIVE keys obtained (not test keys!)
- [ ] PayPal LIVE credentials obtained (not sandbox!)
- [ ] JWT secret generated
- [ ] Hosting account created (Heroku/Railway/Render)

## 🔧 Environment Variables

- [ ] `MONGODB_URI` - MongoDB Atlas connection string
- [ ] `FIREBASE_PROJECT_ID` - Set to `party-connect-q8z7m3`
- [ ] `FIREBASE_PRIVATE_KEY` - From Firebase service account
- [ ] `FIREBASE_CLIENT_EMAIL` - From Firebase service account
- [ ] `STRIPE_SECRET_KEY` - LIVE key (starts with `sk_live_`)
- [ ] `STRIPE_PUBLISHABLE_KEY` - LIVE key (starts with `pk_live_`)
- [ ] `STRIPE_WEBHOOK_SECRET` - From Stripe webhook settings
- [ ] `PAYPAL_CLIENT_ID` - LIVE client ID
- [ ] `PAYPAL_SECRET` - LIVE secret
- [ ] `PAYPAL_MODE` - Set to `live`
- [ ] `JWT_SECRET` - Strong random string
- [ ] `NODE_ENV` - Set to `production`
- [ ] `PORT` - Usually `3000` (auto-set by hosting)
- [ ] `ALLOWED_ORIGINS` - Your app domain(s)
- [ ] `COMMISSION_RATE` - Set to `0.05`
- [ ] `ESCROW_AUTO_RELEASE_HOURS` - Set to `24`

## 🚀 Deployment Steps

- [ ] Code pushed to Git repository
- [ ] Backend deployed to hosting platform
- [ ] All environment variables set in hosting dashboard
- [ ] Deployment successful (no errors in logs)
- [ ] Health check endpoint working: `/api/health`

## 🧪 Testing

- [ ] Health endpoint returns 200: `GET /api/health`
- [ ] User signup works: `POST /api/user/create`
- [ ] User login works: `POST /api/user/me` (with auth token)
- [ ] Party creation works: `POST /api/party/create`
- [ ] Image uploads work (Firebase Storage)
- [ ] Database connections working
- [ ] No errors in server logs

## 🔗 Webhooks Setup

- [ ] Stripe webhook URL configured: `https://your-api.com/api/payments/webhook/stripe`
- [ ] Stripe webhook secret added to environment variables
- [ ] PayPal webhook URL configured: `https://your-api.com/api/payments/webhook/paypal`
- [ ] Webhooks tested (use Stripe/PayPal test tools)

## 📱 Mobile App Update

- [ ] `EXPO_PUBLIC_API_URL` updated in `.env` file
- [ ] Mobile app tested with production API
- [ ] Authentication working
- [ ] Party creation working
- [ ] Payments working (test with small amounts first!)

## 🔒 Security

- [ ] MongoDB network access restricted (only allow hosting IPs if possible)
- [ ] Firebase private key properly escaped (newlines preserved)
- [ ] JWT secret is strong and random
- [ ] No test/development keys in production
- [ ] CORS configured correctly (`ALLOWED_ORIGINS`)
- [ ] Rate limiting enabled (already in code)

## 📊 Monitoring

- [ ] Server logs accessible
- [ ] Error monitoring set up (optional: Sentry)
- [ ] Database monitoring enabled
- [ ] Uptime monitoring configured (optional: UptimeRobot)

## ✅ Final Verification

- [ ] All API endpoints responding
- [ ] No errors in production logs
- [ ] Database queries working
- [ ] File uploads working (Firebase Storage)
- [ ] Payments processing correctly
- [ ] Mobile app connecting successfully

---

## 🎉 Deployment Complete!

Your backend is now live at: `https://your-api-url.com/api`

Update your mobile app and you're ready to go! 🚀

