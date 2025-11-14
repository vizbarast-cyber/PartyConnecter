# ⚡ Quick Deployment - 5 Minutes

Fastest way to get your backend live.

## 🚀 Railway (Recommended - Easiest)

### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Login & Deploy
```bash
cd backend
railway login
railway init
railway up
```

### 3. Set Environment Variables
Go to Railway dashboard → Variables, add:
- `MONGODB_URI` (from MongoDB Atlas)
- `FIREBASE_PROJECT_ID=party-connect-q8z7m3`
- `FIREBASE_PRIVATE_KEY` (from Firebase)
- `FIREBASE_CLIENT_EMAIL` (from Firebase)
- `STRIPE_SECRET_KEY` (LIVE key)
- `STRIPE_PUBLISHABLE_KEY` (LIVE key)
- `PAYPAL_CLIENT_ID` (LIVE)
- `PAYPAL_SECRET` (LIVE)
- `PAYPAL_MODE=live`
- `JWT_SECRET` (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- `NODE_ENV=production`

### 4. Get Your URL
```bash
railway domain
```

Copy the URL and update your mobile app's `EXPO_PUBLIC_API_URL`!

---

## 🎯 Heroku Alternative

### 1. Install & Login
```bash
# Install from: https://devcenter.heroku.com/articles/heroku-cli
heroku login
```

### 2. Create & Deploy
```bash
cd backend
heroku create partyconnect-api
git push heroku main
```

### 3. Set Variables (same as Railway above)
```bash
heroku config:set MONGODB_URI="..."
heroku config:set FIREBASE_PROJECT_ID="party-connect-q8z7m3"
# ... (add all variables)
```

### 4. Get URL
Your API will be at: `https://partyconnect-api.herokuapp.com/api`

---

## ✅ Done!

Update your `.env` file:
```bash
EXPO_PUBLIC_API_URL=https://your-railway-or-heroku-url.com/api
```

That's it! 🎉

