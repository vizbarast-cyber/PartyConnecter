# 🚀 Deploy Service in Railway Dashboard

## Current Status
- ✅ All environment variables added
- ❌ Service not deployed yet (that's why you get 404)

## How to Deploy Service

### Option 1: If You Have a Service Already

1. Go to Railway dashboard → Your project → Your service
2. Go to **"Deployments"** tab
3. Click **"Redeploy"** or **"Deploy"** button
4. Wait 2-5 minutes for deployment

### Option 2: Create New Service (If You Don't Have One)

1. Go to Railway dashboard → Project **"poetic-light"**
2. Click **"+ Create"** button (top right)
3. Select **"GitHub Repo"** (if your code is on GitHub) OR **"Empty Service"**

**If GitHub:**
- Select your repository
- Select the `backend` folder
- Railway will auto-detect Node.js and deploy

**If Empty Service:**
- Railway creates empty service
- You'll need to connect your code:
  - Go to **Settings** → **Source**
  - Connect GitHub repo OR upload code

### Option 3: Deploy via CLI

```powershell
cd backend
railway up
```

---

## After Deployment

1. **Check Logs**: Railway dashboard → Service → **Logs** tab
2. **Look for**:
   - ✅ "🚀 Server running on port 3000"
   - ✅ "MongoDB connected"
   - ✅ "Firebase Admin initialized"
3. **Test**: `https://poetic-light-production.up.railway.app/api/health`
4. **Should return**: `{"status":"ok",...}` instead of 404

---

## ⚠️ Important

The domain exists, but there's **no service running** behind it yet. You need to:
1. **Create a service** (if you don't have one)
2. **Deploy the backend code** to that service
3. **Then** the health endpoint will work

---

## Quick Check

In Railway dashboard:
- Do you see a **service** listed under your project?
- If yes → Click it → Check if it's "Active" or "Building"
- If no → Create one using "+ Create" button

Once the service is deployed and running, your backend will be live! 🎉

