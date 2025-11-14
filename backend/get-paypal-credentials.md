# 💰 How to Get PayPal LIVE Credentials

## Step-by-Step Guide

### 1. Log in to PayPal Developer Dashboard
- Go to https://developer.paypal.com
- Log in with your PayPal **Business** account
- (You need a Business account for live mode)

### 2. Switch to Live Mode
1. In the top navigation, you'll see a toggle or dropdown
2. It might say **"Sandbox"** or **"Test"**
3. Switch it to **"Live"** mode
4. The interface should update to show you're in Live mode

### 3. Get Your Credentials
1. Click on **"My Apps & Credentials"** in the left sidebar
2. You'll see your apps listed
3. Click on your app (or create a new one if needed)
4. Make sure you're viewing the **"Live"** credentials (not Sandbox)
5. You'll see:
   - **Client ID** - Copy this value
   - **Secret** - Click **"Show"** to reveal it, then copy

### 4. Set Environment Variables
```bash
PAYPAL_CLIENT_ID=your-client-id-here
PAYPAL_SECRET=your-secret-here
PAYPAL_MODE=live
```

### 5. Set Up Webhook (After You Deploy)
1. In your app settings, go to **"Webhooks"** section
2. Click **"Add Webhook"**
3. Enter webhook URL: `https://your-api-url.com/api/payments/webhook/paypal`
4. Select these events:
   - ✅ `PAYMENT.CAPTURE.COMPLETED`
   - ✅ `PAYMENT.CAPTURE.DENIED`
   - ✅ `PAYMENT.CAPTURE.REFUNDED`
5. Save the webhook

## ⚠️ Important Notes

- You need a **PayPal Business account** (not personal)
- Make sure `PAYPAL_MODE=live` (not `sandbox`)
- Live credentials are different from Sandbox credentials
- Test thoroughly with small amounts first!

## ✅ Verification

Your credentials should be:
- Long strings (Client ID and Secret)
- From the **"Live"** section, not "Sandbox"
- `PAYPAL_MODE=live` set correctly

## 🔍 Can't Find Live Mode?

1. Make sure you're logged in with a Business account
2. Some accounts need to complete business verification first
3. Check PayPal's documentation for account setup requirements

