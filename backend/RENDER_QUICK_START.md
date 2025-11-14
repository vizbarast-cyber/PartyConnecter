# ⚡ Render Quick Start - 5 Minutes

## Step-by-Step

### 1. Sign Up
- Go to https://render.com
- Click "Get Started"
- Sign up with GitHub

### 2. Create Web Service
- Click **"New +"** → **"Web Service"**
- Connect GitHub → Select your repo
- **Root Directory**: `backend` ⚠️ **IMPORTANT!**
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Plan**: Free

### 3. Add Variables
Click **"Environment"** tab, add all 15 variables (see `SWITCH_TO_RENDER.md` for complete list)

### 4. Deploy
- Click **"Create Web Service"**
- Wait 2-5 minutes
- Get URL: `https://your-service.onrender.com`

### 5. Update Mobile App
```bash
EXPO_PUBLIC_API_URL=https://your-service.onrender.com/api
```

**Done!** Your backend will be live on Render! 🎉

