# Backend Environment Variables Setup

## Create `backend/.env` file

Create a new file called `.env` in the `backend` folder with the following content:

```env
# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=party-connect-q8z7m3
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCw1OmNh3bMjQ9m\nzAfayuvKZrKQ+OIXS3oYF6TSV3mrQU6i7bEtfUlRj0DhCRbsLWCHZDL7VJYVp87H\nOIICh2kd2res5lfQ9j/0i4T85BXOzZNMM7++l9t3eWRFxhV5RAIqCM1VDBa/dqGV\nS/LtLB34VIKyilXL87om3/aojUo4yoA6pKsj49omUYqVvW6gYAyyFPPHVvTEX5sv\n6g2FEP0kXhuQf3pCO/JW5pyJQ+IuBHsHIbOESAzQX3ewuASODIzxnEy/MKk0MAzs\nqMLMtdgErJ6S7t/QmjNCVT4jH3XuGCUcA0G+SDcNMA8mJs4fvsXhixivjqjSU6NH\nhiyTkGxPAgMBAAECggEAPKfLtRBSX7fDIK+7wgD5AGRZvACjDPqG1tzFXKFEysmL\n/7con0HqdF9/EbHcewbVpZtpIWzSTntRImTvs45fMC5l8pjQZo0RQwDYjSZvlJBP\nhkP58ZaFYWXyTzyzAPWjCGgchp+u7d3zbxKuMUyAuz3B1xw8cckYgV0xbn+IhhHc\nrewODZPjpf640anfxC40fJcS5uHY7dJD1nvVvHiJcFJkJJbvlRnAjmvIHpy2IklV\n+vtn+xLTYmZMKe0qONojtvLMuc7eqq4MozbXQ8MbENhVxGrOkXhbXHNUJuLGmXIW\ncAD0d21bPRT0RqVmWqShmxV6kfS3KgG1wZCsm2VJAQKBgQD0TUDroJeT18giNfXx\nEpDo/8TQ6kcW9V0t5wrp4/7NCBUfyqoPmhGH43YZCAw9mT/soLRqOFAiqniooAaj\n+HMBh+FmIOVV7zanABOPEb6IagdT4rrLWiR0Pfa3xQ5J85BPo0RUGfNj24yZJv69\nWR9G4kzJcoZOhAIodlEnW9PAhwKBgQC5TJWJSbLXxvK8jJJFF5SNb35sIj8PX18m\nq9A9xbbV0UN3aVQvTYC3nQY2fsstEKyX017bt4eCxwtEOKwLyjUwHX5d0eintFb4\nCg+Gg3UL9eRxK7ubhSPKE7CCygldlPFVLK56kwBAN3eIocGzHwzc1iqRHMpMeQkl\ngd/EwuvP+QKBgQC8Cx7Wf7VMwkI1Ow3E8sKB5iWLnVj87f48D+QRpkIBdaA06V0/\nRxsJWucTW2N4opZWwFg+jnv4Qvk+6nZSDjIP0pSHdPixzcBmiSOE82aSP/LF+fZI\nAmme4/cc+twFximlcwlsJtF2Yo71b9OS0Z/GgvgR80o381pp5LCQuBjkzwKBgQCw\nnE3qjFPpVbYF//Vp5Q+xvpLAfeOcw0ntkdTpC4k4QjwLlFiovTXxy7ggOLluOnZG\nPzAqOsLt4sjaPSm+Evye332R7n/RWBGMWAp0Ktdkjvks5IHruPpjoGCcR/SlPVDH\n3c5vBa03h6Zmk8YK841O7tGjfc1TFgmhtieRYjdgAQKBgCzduhvxboYc3Q80YElu\nRZEpgCBfvfn75FdfJWTxbfXGGJHEpssmHm5pLQ1BRI+4ugfj7/xPMJcQ1vZByRSs\nzJXVnbrFgkpvQD/iD5zM6VZd3YAUlAuGk5eRqK605TvkFsMOk4nef1wg0ituB/Be\nRfnBsvuM/Cctug7JBXbp8SZ1\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@party-connect-q8z7m3.iam.gserviceaccount.com

# Server Configuration
PORT=3000

# MongoDB Configuration
# For local MongoDB (install MongoDB first):
MONGODB_URI=mongodb://localhost:27017/partyconnect

# For MongoDB Atlas (cloud - recommended):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/partyconnect

# Payment Providers (get from your Stripe dashboard)
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
PAYPAL_CLIENT_ID=AQG6uInwsAVbZ-tSOvGSUg0stYzx0LUcFUWFlh_liD2ce1DYDnYMeXFlvBWLj6mSRbF-F-aAOqfy-gXS
PAYPAL_SECRET=ECmeLOih1RvgeHc9NsOc2226D3Tex7K8dEzyPNc0nCAlBR8LqdvXxgfxubV60aZsBRyzmcYjSYCYIuz5
PAYPAL_MODE=sandbox

# Application Settings
JWT_SECRET=partyconnect-secret-key-change-this-in-production-to-something-random-and-secure
COMMISSION_RATE=0.05
ESCROW_AUTO_RELEASE_HOURS=24

# Stripe Webhook Secret (optional, for production webhooks)
# Get this from Stripe Dashboard → Developers → Webhooks
# STRIPE_WEBHOOK_SECRET=whsec_...
```

## Quick Setup Steps

1. **Create the file:**
   ```bash
   cd backend
   touch .env
   # Or on Windows: type nul > .env
   ```

2. **Copy the content above** into the `.env` file

3. **Update MongoDB URI** if you're using MongoDB Atlas (cloud) instead of local MongoDB

4. **Change JWT_SECRET** to a random secure string for production

5. **Test the connection:**
   ```bash
   npm start
   ```

   You should see:
   ```
   Firebase Admin initialized
   MongoDB connected
   Server running on port 3000
   ```

## Important Notes

- ✅ The `FIREBASE_PRIVATE_KEY` must be in quotes and include the `\n` characters
- ✅ Never commit the `.env` file to Git (it's already in `.gitignore`)
- ✅ The private key is sensitive - keep it secure
- ✅ For production, use a stronger `JWT_SECRET`

## Troubleshooting

### "Firebase Admin initialization error"
- Check that `FIREBASE_PRIVATE_KEY` is in quotes
- Verify the private key includes all `\n` characters
- Make sure there are no extra spaces

### "MongoDB connection error"
- Make sure MongoDB is running locally, OR
- Update `MONGODB_URI` with your MongoDB Atlas connection string

### "Port 3000 already in use"
- Change `PORT=3000` to a different port (e.g., `PORT=3001`)

