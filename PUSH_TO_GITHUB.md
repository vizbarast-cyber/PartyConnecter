# 📤 Push Your Code to GitHub

## Current Status
✅ Your project is a Git repository
❌ Not yet connected to GitHub
❌ No commits yet

## Step-by-Step Guide

### Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in:
   - **Repository name**: `PartyConnect` (or any name you like)
   - **Description**: `Party Connect Mobile App`
   - **Visibility**: Choose **Private** (recommended) or **Public**
   - **DO NOT** check "Initialize with README" (we already have code)
4. Click **"Create repository"**

### Step 2: Copy Your Repository URL

After creating, GitHub will show you a page with commands. You'll see a URL like:
```
https://github.com/YOUR_USERNAME/PartyConnect.git
```

**Copy this URL** - you'll need it in the next step!

### Step 3: Commit and Push Your Code

Run these commands in your terminal (from the project root):

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit - PartyConnect app"

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/PartyConnect.git

# Push to GitHub
git push -u origin master
```

**Note**: If you get an error about authentication, GitHub now requires a Personal Access Token instead of password. See Step 4 below.

### Step 4: GitHub Authentication (If Needed)

If `git push` asks for username/password:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token (classic)"**
3. Give it a name: `PartyConnect Deploy`
4. Select scopes: Check **`repo`** (full control)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)
7. When `git push` asks for password, paste the **token** instead

---

## ✅ After Pushing

Once your code is on GitHub, you can:

1. **Deploy to Render**:
   - Go to https://render.com
   - Sign up with GitHub
   - Render will automatically see your repositories
   - Select `PartyConnect` when creating a web service

2. **Verify on GitHub**:
   - Visit `https://github.com/YOUR_USERNAME/PartyConnect`
   - You should see all your files!

---

## 🚀 Quick Commands Summary

```bash
# From project root (C:\Users\vizba\Downloads\PartyConnect)
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/PartyConnect.git
git push -u origin master
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## Need Help?

- **GitHub Sign Up**: https://github.com/join
- **Create Repo**: https://github.com/new
- **Personal Access Token**: https://github.com/settings/tokens

