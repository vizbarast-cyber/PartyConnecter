# 🔍 Backend Status Check

## What to Verify

### 1. Service is Deployed
- Check Railway dashboard → Your service should show as "Active" or "Running"
- Check if there are any deployment errors

### 2. Environment Variables Set
All these should be set in Railway:
- ✅ MONGODB_URI
- ✅ FIREBASE_PROJECT_ID
- ✅ FIREBASE_CLIENT_EMAIL
- ✅ FIREBASE_PRIVATE_KEY
- ✅ STRIPE_SECRET_KEY
- ✅ STRIPE_PUBLISHABLE_KEY
- ✅ PAYPAL_CLIENT_ID
- ✅ PAYPAL_SECRET
- ✅ PAYPAL_MODE=live
- ✅ JWT_SECRET
- ✅ NODE_ENV=production
- ✅ PORT=3000
- ✅ COMMISSION_RATE=0.05
- ✅ ESCROW_AUTO_RELEASE_HOURS=24

### 3. Health Endpoint Works
Test: `https://poetic-light-production.up.railway.app/api/health`

Should return:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "production",
  "uptime": ...
}
```

### 4. Backend Logs
Check Railway dashboard → Your service → Logs
- Should see: "🚀 Server running on port 3000"
- Should see: "MongoDB connected"
- Should see: "Firebase Admin initialized"
- No errors

---

## Common Issues

### Issue: 404 "Application not found"
**Possible causes:**
1. Service not deployed yet
2. Service crashed on startup
3. Wrong domain/URL
4. Service is still building

**Fix:**
- Check Railway dashboard → Deployments
- Check logs for errors
- Wait a few minutes if just deployed

### Issue: MongoDB connection failed
**Fix:**
- Check MONGODB_URI is correct
- Check MongoDB Atlas network access (allow 0.0.0.0/0)
- Check MongoDB cluster is running

### Issue: Firebase Admin error
**Fix:**
- Check FIREBASE_PRIVATE_KEY has \n newlines preserved
- Check FIREBASE_CLIENT_EMAIL is correct
- Check FIREBASE_PROJECT_ID is correct

---

## ✅ Backend is Good When:

- [ ] Service shows as "Active" in Railway
- [ ] Health endpoint returns 200 OK
- [ ] Logs show server running
- [ ] No errors in logs
- [ ] MongoDB connected
- [ ] Firebase initialized
- [ ] All environment variables set

---

## Quick Test Commands

```powershell
# Check service status
cd backend
railway status

# Check logs
railway logs

# Test health endpoint
curl https://poetic-light-production.up.railway.app/api/health

# List environment variables
railway variables
```

