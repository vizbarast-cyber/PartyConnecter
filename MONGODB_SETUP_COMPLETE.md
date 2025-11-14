# ✅ MongoDB Atlas Connection String Setup

## Your Connection String

You have:
```
mongodb+srv://vizbarast_db_user:<db_password>@partyconnect.b32nyge.mongodb.net/
```

## Complete Connection String

You need to:
1. **Replace `<db_password>`** with your actual database password
2. **Add database name** at the end (e.g., `partyconnect`)

**Final format should be:**
```
mongodb+srv://vizbarast_db_user:YOUR_ACTUAL_PASSWORD@partyconnect.b32nyge.mongodb.net/partyconnect?retryWrites=true&w=majority
```

## Steps to Complete Setup

### 1. Get Your Password
- Go to MongoDB Atlas → Database Access
- Find user `vizbarast_db_user`
- If you forgot the password, click "Edit" → "Edit Password" → Generate new one
- **Copy the password** (you won't see it again!)

### 2. Complete the Connection String
Replace `YOUR_ACTUAL_PASSWORD` in the string above with your real password.

**Example:**
If your password is `MySecurePass123`, your connection string would be:
```
mongodb+srv://vizbarast_db_user:MySecurePass123@partyconnect.b32nyge.mongodb.net/partyconnect?retryWrites=true&w=majority
```

### 3. Update backend/.env File

Open `backend/.env` and find:
```env
MONGODB_URI=mongodb://localhost:27017/partyconnect
```

Replace with your complete connection string:
```env
MONGODB_URI=mongodb+srv://vizbarast_db_user:YOUR_ACTUAL_PASSWORD@partyconnect.b32nyge.mongodb.net/partyconnect?retryWrites=true&w=majority
```

### 4. Important: Password Encoding

If your password contains special characters, you may need to URL-encode them:

| Character | Encoded |
|-----------|---------|
| `@` | `%40` |
| `#` | `%23` |
| `$` | `%24` |
| `%` | `%25` |
| `&` | `%26` |
| `+` | `%2B` |
| `=` | `%3D` |
| `?` | `%3F` |
| `/` | `%2F` |

**Example:**
If password is `My@Pass#123`, use: `My%40Pass%23123`

### 5. Test Connection

Start your backend:
```bash
cd backend
npm start
```

You should see:
```
✅ MongoDB connected
🚀 Server running on port 3000
```

If you see an error, check:
- Password is correct
- IP is whitelisted (Network Access → Add IP Address)
- Connection string format is correct

## Security Reminder

⚠️ **Never commit your `.env` file to Git!**
- It's already in `.gitignore`
- Keep your password secret
- Don't share connection strings publicly

## Quick Checklist

- [ ] Got your database password from MongoDB Atlas
- [ ] Replaced `<db_password>` in connection string
- [ ] Added database name (`partyconnect`) at the end
- [ ] Added connection options (`?retryWrites=true&w=majority`)
- [ ] Updated `backend/.env` file
- [ ] Whitelisted your IP in MongoDB Atlas
- [ ] Tested connection (backend starts successfully)

## Need Help?

If connection fails:
1. Check password is correct (no typos)
2. Verify IP is whitelisted in Network Access
3. Check connection string format (no extra spaces)
4. Try regenerating password if needed

Your connection string is almost ready - just add your password! 🔐

