# ✅ Update MongoDB Connection String

## Your Complete Connection String

```
mongodb+srv://vizbarast_db_user:yRSKtzMQyMTqiueT@partyconnect.b32nyge.mongodb.net/partyconnect?retryWrites=true&w=majority
```

## How to Update backend/.env

### Step 1: Open backend/.env file

### Step 2: Find this line:
```env
MONGODB_URI=mongodb://localhost:27017/partyconnect
```

### Step 3: Replace it with:
```env
MONGODB_URI=mongodb+srv://vizbarast_db_user:yRSKtzMQyMTqiueT@partyconnect.b32nyge.mongodb.net/partyconnect?retryWrites=true&w=majority
```

### Step 4: Save the file

## What Was Added

1. ✅ Password: `yRSKtzMQyMTqiueT`
2. ✅ Database name: `partyconnect` (after `.net/`)
3. ✅ Connection options: `?retryWrites=true&w=majority`

## Important: Whitelist Your IP

Before testing, make sure your IP is whitelisted in MongoDB Atlas:

1. Go to MongoDB Atlas → **Network Access**
2. Click **"Add IP Address"**
3. For development: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

⚠️ **For production**, use specific IPs instead of "Allow from anywhere" for security.

## Test the Connection

After updating `.env`, test it:

```bash
cd backend
npm start
```

You should see:
```
✅ MongoDB connected
🚀 Server running on port 3000
```

If you see an error:
- Check that IP is whitelisted
- Verify password is correct (no typos)
- Make sure connection string has no extra spaces

## Security Reminder

⚠️ Your password is in the `.env` file. Make sure:
- `.env` is in `.gitignore` (it should be)
- Never commit `.env` to Git
- Keep your password secure

Your connection string is ready! Just update the `.env` file. 🚀

