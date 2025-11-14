# 📱 Fix "Unable to parse TLS packet header" Error

## The Problem
You're using `http://localhost:8081` which doesn't work on your phone.

## The Solution

### Step 1: Find Your Computer's IP Address

**Windows:**
```powershell
ipconfig
```
Look for "IPv4 Address" under your Wi-Fi adapter (e.g., `192.168.1.100`)

### Step 2: Use `exp://` Protocol (NOT `http://`)

In the phone app, enter:
```
exp://YOUR_IP_ADDRESS:8081
```

**Example:**
If your IP is `192.168.1.100`, enter:
```
exp://192.168.1.100:8081
```

### Step 3: Make Sure Expo is Running

On your computer, run:
```powershell
npx expo start
```

You should see:
```
Metro waiting on exp://192.168.1.XXX:8081
```

Use that exact URL!

---

## Alternative: Use Tunnel (Easiest)

If you're having network issues:

1. **Stop Expo** (Ctrl+C)

2. **Start with tunnel:**
   ```powershell
   npx expo start --tunnel
   ```

3. **Enter the URL shown** (starts with `exp://u.expo.dev/...`)

This works from anywhere, even different Wi-Fi networks!

---

## Quick Checklist

- ✅ Use `exp://` NOT `http://`
- ✅ Use your computer's IP, NOT `localhost`
- ✅ Make sure phone and computer are on same Wi-Fi
- ✅ Make sure `npx expo start` is running
- ✅ Port 8081 should be open (check firewall)

---

## Still Not Working?

Try tunnel mode - it's the most reliable:
```powershell
npx expo start --tunnel
```

Then enter the `exp://u.expo.dev/...` URL shown in the terminal.

