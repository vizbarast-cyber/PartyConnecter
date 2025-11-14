# 📱 Connect Your Phone to Expo

## Quick Connection Options

### Option 1: Use Expo Go App (Easiest)
1. **Install Expo Go** on your phone:
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

2. **Start Expo**:
   ```powershell
   npx expo start
   ```

3. **Scan QR Code**:
   - Android: Open Expo Go → Scan QR code from terminal
   - iOS: Open Camera app → Scan QR code → Tap notification

### Option 2: Enter URL Manually
When you run `npx expo start`, you'll see something like:

```
Metro waiting on exp://192.168.1.100:8081
```

**Enter this in Expo Go**:
- Open Expo Go app
- Tap "Enter URL manually"
- Enter: `exp://192.168.1.100:8081` (use the IP shown in your terminal)

### Option 3: Use Tunnel (If on Different Network)
If your phone and computer are on different Wi-Fi networks:

```powershell
npx expo start --tunnel
```

This creates a public URL like: `exp://u.expo.dev/...`

**Enter this URL** in Expo Go app.

### Option 4: Use LAN (Same Wi-Fi)
Make sure your phone and computer are on the same Wi-Fi:

```powershell
npx expo start --lan
```

Then enter the URL shown (usually `exp://192.168.x.x:8081`)

---

## Common Issues

### "Unable to connect"
- Make sure phone and computer are on the same Wi-Fi
- Check firewall isn't blocking port 8081
- Try `--tunnel` option

### "Network request failed"
- Check your `.env` file has correct `EXPO_PUBLIC_API_URL`
- Make sure backend is running (if testing API calls)

### "Metro bundler not found"
- Make sure `npx expo start` is running
- Check the terminal for the connection URL

---

## What to Enter

**In Expo Go app**, when it asks for a URL, enter:

```
exp://YOUR_COMPUTER_IP:8081
```

Replace `YOUR_COMPUTER_IP` with the IP address shown when you run `npx expo start`.

**Example:**
```
exp://192.168.1.100:8081
```

---

## Quick Start

1. Run: `npx expo start`
2. Look for the URL in terminal (starts with `exp://`)
3. Open Expo Go on your phone
4. Scan QR code OR enter URL manually
5. App should load!

