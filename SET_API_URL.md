# 🔗 Set API URL - Quick Guide

## Your Railway URL
✅ **Domain**: `https://poetic-light-production.up.railway.app`  
✅ **API URL**: `https://poetic-light-production.up.railway.app/api`

## Option 1: Create/Update .env File (Easiest)

Create or update `.env` file in the root directory:

```bash
EXPO_PUBLIC_API_URL=https://poetic-light-production.up.railway.app/api
```

## Option 2: Use EAS Dashboard

1. Go to https://expo.dev
2. Select your project: `partyconnect-backend`
3. Go to **Settings** → **Environment Variables**
4. Add or update: `EXPO_PUBLIC_API_URL` = `https://poetic-light-production.up.railway.app/api`

## Option 3: Use EAS CLI (Interactive)

Run this in your terminal (it will prompt you):

```powershell
npx eas-cli env:create
```

When prompted:
- **Name**: `EXPO_PUBLIC_API_URL`
- **Value**: `https://poetic-light-production.up.railway.app/api`
- **Type**: `string`
- **Visibility**: `plain` (or `sensitive` if you prefer)
- **Environment**: `preview` (or `all`)

---

## Verify Backend is Working

The health endpoint returned 404. Let's check:

1. **Check Railway logs**: Go to Railway dashboard → Your service → Logs
2. **Verify the route**: Make sure `/api/health` endpoint exists in your backend
3. **Check deployment**: Make sure the service is fully deployed

---

## Next: Build Your App

Once the API URL is set, you can build:

```powershell
npx eas-cli build --platform android --profile preview
```

When prompted:
- **Android application id**: `com.mycompany.partyconnect`
- **Generate keystore**: `Yes`

---

## Quick Fix: Create .env File

I'll create the .env file for you with the correct URL.

