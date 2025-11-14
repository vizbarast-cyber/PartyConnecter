# ⚡ Quick GitHub Setup

## 1. Create Repo on GitHub
- Go to https://github.com/new
- Name: `PartyConnect`
- Click **"Create repository"**

## 2. Copy the Repository URL
You'll see: `https://github.com/YOUR_USERNAME/PartyConnect.git`

## 3. Run These Commands

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/PartyConnect.git
git push -u origin master
```

**Replace `YOUR_USERNAME` with your GitHub username!**

## 4. If Authentication Fails
- Go to: https://github.com/settings/tokens
- Generate new token (classic)
- Check `repo` scope
- Use token as password when pushing

## ✅ Done!
Now you can connect to Render!

