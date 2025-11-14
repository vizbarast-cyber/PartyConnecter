# 💳 How to Get Stripe LIVE Keys

## Step-by-Step Guide

### 1. Log in to Stripe Dashboard
- Go to https://dashboard.stripe.com
- Log in with your Stripe account

### 2. Switch to Live Mode
- Look at the top right corner
- You'll see a toggle that says **"Test mode"**
- Click it to switch to **"Live mode"**
- The toggle should now show **"Live mode"** (usually with a green indicator)

### 3. Get Your API Keys
1. Click on **"Developers"** in the left sidebar
2. Click on **"API keys"**
3. You'll see two keys:

   **Publishable key** (visible immediately):
   - Starts with `pk_live_...`
   - Copy this value
   - Set as: `STRIPE_PUBLISHABLE_KEY`

   **Secret key** (hidden by default):
   - Starts with `sk_live_...`
   - Click **"Reveal test key"** or **"Reveal live key"** button
   - Copy this value
   - Set as: `STRIPE_SECRET_KEY`

### 4. Set Up Webhook (After You Deploy)
1. Still in **Developers** section, click **"Webhooks"**
2. Click **"Add endpoint"**
3. Enter your API URL: `https://your-api-url.com/api/payments/webhook/stripe`
4. Select these events:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.refunded`
5. Click **"Add endpoint"**
6. Copy the **"Signing secret"** (starts with `whsec_...`)
7. Set as: `STRIPE_WEBHOOK_SECRET`

## ⚠️ Important Notes

- **LIVE keys** start with `pk_live_` and `sk_live_`
- **TEST keys** start with `pk_test_` and `sk_test_` (don't use these!)
- Webhook secret is different from API keys
- Set up webhook AFTER you have your production API URL

## ✅ Verification

Your keys should look like:
- `STRIPE_PUBLISHABLE_KEY=pk_live_51AbCdEf...`
- `STRIPE_SECRET_KEY=sk_live_51AbCdEf...`
- `STRIPE_WEBHOOK_SECRET=whsec_...` (after webhook setup)

If they start with `pk_test_` or `sk_test_`, you're still in test mode!

