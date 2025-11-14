# 🔗 Webhook Setup Guide (After Deployment)

Set up Stripe and PayPal webhooks **after** your backend is deployed and you have your production API URL.

## ⚠️ Important

**Webhooks can only be set up AFTER deployment** because you need:
1. Your production API URL (e.g., `https://your-api.railway.app` or `https://your-api.herokuapp.com`)
2. The API to be running and accessible
3. The webhook endpoints to be live

---

## 💳 Stripe Webhook Setup

### Step 1: Get Your Production API URL

After deployment, you'll have a URL like:
- Railway: `https://your-app.up.railway.app`
- Heroku: `https://your-app.herokuapp.com`
- Render: `https://your-app.onrender.com`

Your webhook URL will be: `https://your-api-url.com/api/payments/webhook/stripe`

### Step 2: Set Up Webhook in Stripe Dashboard

1. **Go to Stripe Dashboard**: https://dashboard.stripe.com
2. **Make sure you're in LIVE mode** (not test mode)
3. Click **"Developers"** in the left sidebar
4. Click **"Webhooks"**
5. Click **"Add endpoint"** button

### Step 3: Configure Webhook

1. **Endpoint URL**: Enter your webhook URL
   ```
   https://your-api-url.com/api/payments/webhook/stripe
   ```
   Replace `your-api-url.com` with your actual API URL

2. **Description** (optional): 
   ```
   PartyConnect Production Webhook
   ```

3. **Events to send**: Select these events:
   - ✅ `payment_intent.succeeded` - When payment is successful
   - ✅ `payment_intent.payment_failed` - When payment fails
   - ✅ `charge.refunded` - When a refund is processed
   - ✅ `payment_intent.canceled` - When payment is canceled

4. Click **"Add endpoint"**

### Step 4: Get Webhook Signing Secret

1. After creating the webhook, you'll see it in the list
2. Click on the webhook endpoint
3. In the **"Signing secret"** section, click **"Reveal"** or **"Click to reveal"**
4. Copy the secret (it starts with `whsec_...`)
5. This is your `STRIPE_WEBHOOK_SECRET`

### Step 5: Add to Environment Variables

Add this to your hosting platform's environment variables:

```bash
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

**For Railway:**
```bash
railway variables set STRIPE_WEBHOOK_SECRET="whsec_..."
```

**For Heroku:**
```bash
heroku config:set STRIPE_WEBHOOK_SECRET="whsec_..."
```

**For Render:**
- Go to dashboard → Your service → Environment
- Add variable: `STRIPE_WEBHOOK_SECRET=whsec_...`

### Step 6: Test Webhook

1. In Stripe Dashboard → Webhooks → Your endpoint
2. Click **"Send test webhook"**
3. Select an event (e.g., `payment_intent.succeeded`)
4. Click **"Send test webhook"**
5. Check your API logs to see if it was received

---

## 💰 PayPal Webhook Setup

### Step 1: Get Your Production API URL

Same as Stripe - use your deployed API URL.

Your webhook URL will be: `https://your-api-url.com/api/payments/webhook/paypal`

### Step 2: Set Up Webhook in PayPal Dashboard

1. **Go to PayPal Developer Dashboard**: https://developer.paypal.com
2. **Make sure you're in LIVE mode** (not Sandbox)
3. Log in with your PayPal Business account
4. Click **"My Apps & Credentials"** in the left sidebar
5. Click on your app (or create one if needed)
6. Scroll down to **"Webhooks"** section
7. Click **"Add Webhook"** or **"Create Webhook"**

### Step 3: Configure Webhook

1. **Webhook URL**: Enter your webhook URL
   ```
   https://your-api-url.com/api/payments/webhook/paypal
   ```
   Replace `your-api-url.com` with your actual API URL

2. **Event types**: Select these events:
   - ✅ `PAYMENT.CAPTURE.COMPLETED` - When payment is completed
   - ✅ `PAYMENT.CAPTURE.DENIED` - When payment is denied
   - ✅ `PAYMENT.CAPTURE.REFUNDED` - When refund is processed
   - ✅ `PAYMENT.CAPTURE.REVERSED` - When payment is reversed

3. Click **"Save"** or **"Create Webhook"**

### Step 4: Verify Webhook

1. PayPal will send a verification request to your webhook URL
2. Your backend should automatically handle this (already implemented)
3. Check your API logs to confirm verification was successful
4. The webhook should show as **"Active"** in PayPal dashboard

### Step 5: Test Webhook (Optional)

1. In PayPal Dashboard → Your App → Webhooks
2. Click on your webhook
3. Use PayPal's webhook testing tools if available
4. Or make a test payment and check logs

---

## ✅ Verification Checklist

After setting up webhooks:

- [ ] Stripe webhook created in LIVE mode
- [ ] Stripe webhook URL is correct: `https://your-api.com/api/payments/webhook/stripe`
- [ ] `STRIPE_WEBHOOK_SECRET` added to environment variables
- [ ] Stripe webhook shows as "Active" or "Enabled"
- [ ] PayPal webhook created in LIVE mode
- [ ] PayPal webhook URL is correct: `https://your-api.com/api/payments/webhook/paypal`
- [ ] PayPal webhook shows as "Active" or "Verified"
- [ ] Test webhook sent from Stripe (check logs)
- [ ] Test payment made (check logs for webhook events)

---

## 🐛 Troubleshooting

### Stripe Webhook Not Receiving Events

1. **Check URL**: Make sure the webhook URL is correct and accessible
2. **Check logs**: Look at your API logs for incoming webhook requests
3. **Check mode**: Ensure webhook is in LIVE mode (not test)
4. **Check secret**: Verify `STRIPE_WEBHOOK_SECRET` is set correctly
5. **Test endpoint**: Use Stripe's "Send test webhook" feature

### PayPal Webhook Not Verified

1. **Check URL**: Ensure webhook URL is accessible
2. **Check logs**: Look for verification requests in API logs
3. **Check mode**: Ensure you're in LIVE mode (not Sandbox)
4. **Check CORS**: Make sure your API allows PayPal's requests
5. **Retry**: Delete and recreate the webhook if needed

### Webhook Signature Verification Failed

1. **Stripe**: Check that `STRIPE_WEBHOOK_SECRET` matches the one in dashboard
2. **PayPal**: Verify your credentials are correct
3. **Check logs**: Look for specific error messages
4. **Recreate secret**: Generate a new webhook secret if needed

---

## 📝 Quick Reference

### Stripe Webhook URL Format
```
https://your-api-url.com/api/payments/webhook/stripe
```

### PayPal Webhook URL Format
```
https://your-api-url.com/api/payments/webhook/paypal
```

### Environment Variable
```bash
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

### Required Events

**Stripe:**
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`

**PayPal:**
- `PAYMENT.CAPTURE.COMPLETED`
- `PAYMENT.CAPTURE.DENIED`
- `PAYMENT.CAPTURE.REFUNDED`

---

## 🎉 Done!

Once webhooks are set up:
1. Your backend will receive payment events automatically
2. Payments will be processed correctly
3. Refunds will work properly
4. You can monitor webhook events in both dashboards

**Remember**: Webhooks are critical for payment processing. Make sure they're set up correctly before going live!

