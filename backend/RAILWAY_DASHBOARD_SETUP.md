# 🎨 Railway Dashboard Setup - Step by Step

## How to Set Environment Variables in Railway Dashboard

### Step 1: Open Your Service

1. Go to https://railway.app
2. Click on your project: **"poetic-light"**
3. Click on your **service** (if you have one) OR create a new service first

### Step 2: Create Service (If You Don't Have One)

1. In Railway dashboard, click **"+ Create"** button (top right)
2. Select **"GitHub Repo"** (if your code is on GitHub) OR **"Empty Service"**
3. If GitHub:
   - Select your repository
   - Select the `backend` folder
   - Railway will auto-detect Node.js
4. Wait for service to be created

### Step 3: Add Environment Variables

1. Click on your **service** in the Railway dashboard
2. Click on the **"Variables"** tab (in the top navigation)
3. Click **"+ New Variable"** button
4. Add each variable one by one (see list below)

---

## 📋 Variables to Add (Copy & Paste)

### 1. MongoDB
- **Name**: `MONGODB_URI`
- **Value**: `mongodb+srv://vizbarast_db_user:UQrFXHI8dvXz1vIe@partyconnect.b32nyge.mongodb.net/partyconnect?retryWrites=true&w=majority`

### 2. Firebase Project ID
- **Name**: `FIREBASE_PROJECT_ID`
- **Value**: `party-connect-q8z7m3`

### 3. Firebase Client Email
- **Name**: `FIREBASE_CLIENT_EMAIL`
- **Value**: `firebase-adminsdk-fbsvc@party-connect-q8z7m3.iam.gserviceaccount.com`

### 4. Firebase Private Key
- **Name**: `FIREBASE_PRIVATE_KEY`
- **Value**: (Copy the entire key below - keep the newlines)
```
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDe/z+E5LqlsCc3
JkGSvKx/RTwEdJ3Qwei6oP+fGM2eC8M6OJTg6zKeba1uoZbmrNYlsRRTD+dBH38t
xtEgHKKOX7MJ3Vi6iOsZy5zrnQFSREF1SLSMAVWTffCTXrnEQ4InHRNmF6NhY5ma
9pl4t/4p7dYjdW8oN6WlVpgSBb6f8uYVC/dYOO3LFsCv/Yb/MPnEG6Oc6NE3fAyZ
gf9jsuet8jhWEmASYyLxyBoPK2uKHF+tOZ6nLc0P72DExCB2N7mdWiUi3VMVx6vd
zB4c6UlzGdrKNpJr5K4VGtsd5GbdiyxO0FxL0pmAGvpnFde2ZVzgOsP5O2VnnLG9
NYCgdCXHAgMBAAECggEAJwxjPw4ecO0LsOiOCvfm7NJe1Bjnmaqa6jNPD7j0KHy+
zu8hgtEsp/lkqT66geI6DZeYi4L5Z7nwNz/dVtYs0OmJHG0aIG/hWz8AV3HCzXkO
TU9R7kI9jfo7qlKoDOoVXGwG/ZWeEmuydiRAc5ckdosjOEpUEKLN6snjDyTaYH+A
gGzdPrEVHVPepLpH4T5j4MM8QI080QmWmxWzn04JoGAhF6OSqV5l/i0tXaxZzn/p
2VwWToHGDYDXabETTbo2YepQmS3ReyhFKDynIIX8xxhsTk9yYwaI1b7FmmfjMk+6
7fd/TVMSW6o9v9SUJzcuJ3A5kw2S/rUS54gMhB7GQQKBgQDz/sbQyUFR97yK1Wji
S6jot/K6ZSHwOSYs/hgnPAI/lykjnavznpjHCBP5ojksIA/o2xMKUuzjo2fL82of
aoBbmzdm0CJvXQB11v/Ji4SRVyHp81RkAcjgE/Pdat/AmEs1AQByG0+SKudsqS8g
GStR3MLI0rr1FIJJ0rnoEUxQ2QKBgQDp9/2j76PqYhkSxfKti682odFaojHVsyaA
HcVsQP6IiX7l+BhitIwuIBAh99av9WMZMMe8VdufpalKKk19XpOsQotDu5w5cyPT
DzwPY4EniHHuXoSnLSToxGVJslw8wIABWVuexaajbHoaUlPYdI2IDh+IJkDFtg6u
Tf9MQ5gHnwKBgDyR2a8I1uNPOYnJcpECsTqcN3BYHLWyqixvI3XR6sj4cGj8Aiyn
CUwXUEYfJEw05V4rzC066r2T2feCRKzp1lVnUbh/IJ0+nBekuLjCnrUpySx3kFKH
MuOVcGtd1Y/M/pZ42jB5YSZq6ipKUX2JYfyfbedGkMy4O6Ox4R6f9K75AoGBAMlV
ykJkWZ28RO9OwAJvjZtprIpdwJywyZS+CcGaPG6qQzUKRZHK5EZc+QUCDRDmDR0E
SRzclV3QZNmZhY048cLukID81PbrCgz5syla6y1l0QTa+TQTOQvE1ZSRk6YD0SNY
DeuXEkrXcktsRRKjWZeW77Ntl5eLjx6Xp/WsxQrpAoGBANEslAHPzuA1OEqktCR+
v+858nZUnoPJ5O4MmhZhdGj+o/vc/GcTCysv7Ft69R1cYYMW4vppyizqBm+eOyRX
Rwb/XpHstwbWMooLsVatry/dzzFD+ODzDsRXJVSxHxer4txsiugQQjYnCAErZe0V
XCn2NZRvGNVk0YBsLn9v6K7S
-----END PRIVATE KEY-----
```

### 5. Stripe Secret Key
- **Name**: `STRIPE_SECRET_KEY`
- **Value**: `your_stripe_secret_key_here`

### 6. Stripe Publishable Key
- **Name**: `STRIPE_PUBLISHABLE_KEY`
- **Value**: `pk_live_51OMCDWGYSmJketTkw3nnIbyDg54BFBIG8zjxm3UIh7RvSTVetC0bOzcqvfvmWdkWknz8g2qxMc8dalNfu5xHrwUW00ONoP1mId`

### 7. PayPal Client ID
- **Name**: `PAYPAL_CLIENT_ID`
- **Value**: `AQG6uInwsAVbZ-tSOvGSUg0stYzx0LUcFUWFlh_liD2ce1DYDnYMeXFlvBWLj6mSRbF-F-aAOqfy-gXS`

### 8. PayPal Secret
- **Name**: `PAYPAL_SECRET`
- **Value**: `ECmeLOih1RvgeHc9NsOc2226D3Tex7K8dEzyPNc0nCAlBR8LqdvXxgfxubV60aZsBRyzmcYjSYCYIuz5`

### 9. PayPal Mode
- **Name**: `PAYPAL_MODE`
- **Value**: `live`

### 10. JWT Secret
- **Name**: `JWT_SECRET`
- **Value**: `9201d07faad672a17cc424e9ed2db0fcf921961280b312984b9636f9b14fe151`

### 11. Node Environment
- **Name**: `NODE_ENV`
- **Value**: `production`

### 12. Port
- **Name**: `PORT`
- **Value**: `3000`

### 13. Commission Rate
- **Name**: `COMMISSION_RATE`
- **Value**: `0.05`

### 14. Escrow Auto Release Hours
- **Name**: `ESCROW_AUTO_RELEASE_HOURS`
- **Value**: `24`

### 15. Allowed Origins
- **Name**: `ALLOWED_ORIGINS`
- **Value**: `*`

---

## 📸 Visual Guide

1. **Railway Dashboard** → Your Project → Your Service
2. **Click "Variables" tab** (top navigation)
3. **Click "+ New Variable"** button
4. **Enter Name and Value**
5. **Click "Add"** or "Save"
6. **Repeat** for each variable

---

## ⚠️ Important Notes

### Firebase Private Key
When pasting the Firebase private key:
- **Keep all the newlines** (don't replace `\n` with actual newlines)
- Paste it exactly as shown above
- Railway dashboard should handle it correctly

### After Adding Variables
1. Railway will **auto-redeploy** your service
2. Wait 2-5 minutes for deployment
3. Check **Logs** tab to see if it's running
4. Test: `https://poetic-light-production.up.railway.app/api/health`

---

## ✅ Checklist

Add these 15 variables:
- [ ] MONGODB_URI
- [ ] FIREBASE_PROJECT_ID
- [ ] FIREBASE_CLIENT_EMAIL
- [ ] FIREBASE_PRIVATE_KEY
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_PUBLISHABLE_KEY
- [ ] PAYPAL_CLIENT_ID
- [ ] PAYPAL_SECRET
- [ ] PAYPAL_MODE
- [ ] JWT_SECRET
- [ ] NODE_ENV
- [ ] PORT
- [ ] COMMISSION_RATE
- [ ] ESCROW_AUTO_RELEASE_HOURS
- [ ] ALLOWED_ORIGINS

---

## 🚀 After Adding All Variables

1. Check **Deployments** tab - should show "Building" or "Active"
2. Check **Logs** tab - should see:
   - "🚀 Server running on port 3000"
   - "MongoDB connected"
   - "Firebase Admin initialized"
3. Test health endpoint
4. Your backend will be live! 🎉

